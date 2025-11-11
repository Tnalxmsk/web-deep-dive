import { isMainThread, parentPort, Worker, workerData } from "worker_threads";

const BUFFER_SIZE = 20;

const CTRL = {
  HEAD: 0,         // 읽기 인덱스
  TAIL: 1,         // 쓰기 인덱스
  MUTEX: 2,        // 0: unlocked 1: locked
  SEM_EMPTY: 3,    // 비어있는 슬롯 개수 세마포어
  SEM_FULL: 4,     // 채워진 슬롯 개수 세마포어
  STOP: 5,         // 1이면 종료
  PRODUCED_SEC: 6, // 초당 생산 카운트 누적
  CONSUMED_SEC: 7, // 초당 소비 카운트 누적
  SLEEP: 8,        // 슬립용
} as const;

const mutexLock = (ctrl: Int32Array) => {
  while (true) {
    if (Atomics.compareExchange(ctrl, CTRL.MUTEX, 0, 1) === 0) return;
    Atomics.wait(ctrl, CTRL.MUTEX, 1);
  }
};

const mutexUnlock = (ctrl: Int32Array) => {
  Atomics.store(ctrl, CTRL.MUTEX, 0);
  Atomics.notify(ctrl, CTRL.MUTEX, 1);
};

// 세마포어 구현
// 값이 0이면 대기, post가 notify로 깨움
const semWait = (ctrl: Int32Array, idx: number, cancelOnStop = false): boolean => {
  while (true) {
    const v = Atomics.load(ctrl, idx);
    if (v === 0) {
      if (cancelOnStop && Atomics.load(ctrl, CTRL.STOP) === 1) return false; // ← STOP이면 빠져나감
      Atomics.wait(ctrl, idx, 0, 50);
      continue;
    }
    if (Atomics.compareExchange(ctrl, idx, v, v - 1) === v) return true;
  }
};

const semPost = (ctrl: Int32Array, idx: number) => {
  const prev = Atomics.add(ctrl, idx, 1);
  if (prev === 0) Atomics.notify(ctrl, idx, 1);
};

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const shouldStop = (ctrl: Int32Array) => Atomics.load(ctrl, CTRL.STOP) === 1;

interface WorkerData {
  role: "producer" | "consumer";
  bufSab: SharedArrayBuffer;
  ctrlSab: SharedArrayBuffer;
}

// 워커 (Producer / Consumer)
if (!isMainThread) {
  const { role, bufSab, ctrlSab }: WorkerData = workerData;
  const buffer = new Int32Array(bufSab);
  const ctrl = new Int32Array(ctrlSab);

  if (role === "producer") {
    const minDelayMs = 0;
    const maxDelayMs = 5;

    while (!shouldStop(ctrl)) {
      semWait(ctrl, CTRL.SEM_EMPTY);

      mutexLock(ctrl);
      const tail = Atomics.load(ctrl, CTRL.TAIL);
      buffer[tail] = randInt(1, 9999);
      Atomics.store(ctrl, CTRL.TAIL, (tail + 1) % BUFFER_SIZE);
      mutexUnlock(ctrl);

      Atomics.add(ctrl, CTRL.PRODUCED_SEC, 1);
      semPost(ctrl, CTRL.SEM_FULL);

      const delay = randInt(minDelayMs, maxDelayMs);
      Atomics.wait(ctrl, CTRL.SLEEP, 0, delay);
    }

    parentPort?.postMessage({ role, status: "stop" });
  }

  if (role === "consumer") {
    while (true) {
      if (shouldStop(ctrl) && Atomics.load(ctrl, CTRL.SEM_FULL) === 0) break;

      if (!semWait(ctrl, CTRL.SEM_FULL, true)) break;

      mutexLock(ctrl);
      const head = Atomics.load(ctrl, CTRL.HEAD);
      const value = buffer[head];
      Atomics.store(ctrl, CTRL.HEAD, (head + 1) % BUFFER_SIZE);
      mutexUnlock(ctrl);

      Atomics.add(ctrl, CTRL.CONSUMED_SEC, 1);
      console.log(`[consume] ${value}`);
      semPost(ctrl, CTRL.SEM_EMPTY);
    }
    parentPort?.postMessage({ done: true, role });
  }
}

// 메인 스레드
if (isMainThread) {
  const bufSab = new SharedArrayBuffer(BUFFER_SIZE * Int32Array.BYTES_PER_ELEMENT);
  const CTRL_SLOTS = Math.max(...Object.values(CTRL)) + 1;
  const ctrlSab = new SharedArrayBuffer(CTRL_SLOTS * Int32Array.BYTES_PER_ELEMENT);
  const ctrl = new Int32Array(ctrlSab);

  // Initial state
  Atomics.store(ctrl, CTRL.HEAD, 0);
  Atomics.store(ctrl, CTRL.TAIL, 0);
  Atomics.store(ctrl, CTRL.MUTEX, 0);
  Atomics.store(ctrl, CTRL.SEM_EMPTY, BUFFER_SIZE);
  Atomics.store(ctrl, CTRL.SEM_FULL, 0);
  Atomics.store(ctrl, CTRL.STOP, 0);
  Atomics.store(ctrl, CTRL.PRODUCED_SEC, 0);
  Atomics.store(ctrl, CTRL.CONSUMED_SEC, 0);
  Atomics.store(ctrl, CTRL.SLEEP, 0);

  const producer = new Worker(__filename, { workerData: { role: "producer", bufSab, ctrlSab } });
  const consumer = new Worker(__filename, { workerData: { role: "consumer", bufSab, ctrlSab } });

  // CHANGED: 메시지 타입에 맞게 조건 수정
  producer.on("message", (msg) => {
    if (msg?.status === "stop") {
      console.log(`[main] ${msg.role} 멈춤`);
    }
  });
  consumer.on("message", (msg) => {
    if (msg?.done) {
      console.log(`[main] ${msg.role} 멈춤`);
    }
  });

  producer.on("error", (err) => {
    console.error(`[main] producer error: ${err}`);
  });
  consumer.on("error", (err) => {
    console.error(`[main] consumer error: ${err}`);
  });

  const throughputTimer = setInterval(() => {
    const prod = Atomics.exchange(ctrl, CTRL.PRODUCED_SEC, 0);
    const cons = Atomics.exchange(ctrl, CTRL.CONSUMED_SEC, 0);
    console.log(`[throughput] produced/s = ${prod}, consumed/s = ${cons}`);
  }, 1000);

  // CHANGED: exit 리스너를 선등록하고 Promise로 묶음 (레이스 방지)
  const onExit = Promise.all([
    new Promise<void>((res) => producer.once("exit", () => res())),
    new Promise<void>((res) => consumer.once("exit", () => res())),
  ]);

  const RUN_SECONDS = 10;

  setTimeout(async () => {
    console.log(`[main] 멈춤`);
    Atomics.store(ctrl, CTRL.STOP, 1);

    Atomics.notify(ctrl, CTRL.SEM_EMPTY, BUFFER_SIZE);
    Atomics.notify(ctrl, CTRL.SEM_FULL, BUFFER_SIZE);
    Atomics.notify(ctrl, CTRL.MUTEX, 0x7fffffff);

    await onExit;
    clearInterval(throughputTimer);
    console.log("[main] all workers exited");
  }, RUN_SECONDS * 1000);
}
