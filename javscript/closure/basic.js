function init() {
  var name = "장민수"; // init 함수 내에서 생성된 지역 변수

  function displayName() {
    // displayName()은 내부 함수이며, 클로저
    console.log(name); // 부모 함수에서 선언된 변수를 사용
  }
  displayName();
}

init();


