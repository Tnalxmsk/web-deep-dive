export const debounce = <Args extends unknown[]>(callback: (...args: Args) => void, delay: number) => {
  // 마지막으로 예약된 타이머를 저장
  // 연속 호출 시 이전 타이머를 취소하기 위해 필요
  let timer: ReturnType<typeof setTimeout> | null = null;

  // debounce가 적용된 함수 반환
  return (...args: Args) => {
    // 이전에 예약된 실행이 있다면 취소
    // -> 호출이 계속되면 callback은 실행되지 않음
    if (timer) clearTimeout(timer);

    // delay 이후 callback 실행을 예약
    // -> 호출이 멈추고 delay가 지나야 실행됨
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
