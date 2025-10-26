var count = 0;

function increase(n) {
  return ++n;
}

// 순수 함수가 반환한 결과값을 변수에 재할당해 상태를 변경
count = increase(count);
// 외부 상태 값을 변경시키지 않음
console.log(increase(count));
console.log(count);
count = increase(count);
console.log(count);

// 비순수 함수
// 외부 상태에 따라 반환 값이 달라짐
// 외부 상태에 의존하는 함수
function increase2() {
  return ++count;
}
