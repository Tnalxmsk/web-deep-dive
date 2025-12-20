export const throttle = <Args extends unknown[]>(callback: (...args: Args) => void, delay: number) => {
  // 마지막으로 callback이 실행된 시점
  // Date.now() 기준의 밀리초 값
  let lastCall = 0;

  // throttle이 적용된 함수 반환
  return (...args: Args) => {
    // 현재 시점을 읽음
    // setTimeout을 사용하지 않고 시간 비교에만 사용
    const now = Date.now();

    // 마지막 실행 시점과 현재 시점의 차이가
    // delay 이상일 경우에만 callback 실행
    // -> 일정 주기마다 최대 한 번만 실행되도록 제한
    if (now - lastCall >= delay) {
      // 실행 시점을 현재 시점으로 갱신
      lastCall = now;
      callback(...args);
    }
  };
};
