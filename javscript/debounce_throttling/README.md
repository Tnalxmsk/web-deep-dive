# Debounce & Throttling

## Debounce
JS에서 debounce는 유저가 입력할 때마다 코드를 오직 한 번씩만 실행되도록 해주는 함수

검색 박스의 제안, 텍스트 필드의 자동, 버튼의 더블 클릭의 제거 모두 debounce를 이용하는 사례

### **전자공학에서의 debounce**

전자공학에서 온 용어

TV 리모컨 버튼을 누를 때, 버튼에서 손을 떼려고 하기도 전에 신호는 아주 빠르게 마이크로칩으로 흐르고, 이것이 디바운스 되어 마이크로칩은 이렇게 여러 번 ‘클릭’한 것을 등록해버림

이 과정을 줄이려면, 버튼으로부터 신호를 받았다면, 마이크로칩은 물리적으로 다시 버튼을 누르는 것이 불가능한, 약 몇 마이크로초 동안 버튼으로부터 온 신호를 처리하지 않음

### JS에서 Debounce

UseCase에 따라 오직 한 번만 함수를 실행시키고 싶음

방문자가 타이핑을 끝내고 난 뒤에만 검색 질의에 대한 제안 옵션을 보여주고 싶다고 가정

아니면 양식의 내용을 저장하고자 하지만, 매번 ‘저장’이 발생한다면 DB를 거쳐야 하니, 사용자가 해당 내용을 적극적으로 변경하지 않을 때만 이를 하고 싶다고 가정

dbounce 함수

```jsx
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function saveInput() {
  console.log('Saving data');
}

const processChange = debounce(() => saveInput())
```

input

```jsx
<input type="text" onkeyup="processChange()" />
```

button

```jsx
<button onclick="processChange()">Click me</button>
```

window 이벤트

```jsx
window.addEventListener('scroll', processChange);
```

debounce는 특별한 함수로, 두 가지 일을 처리함

- timer 값의 스코프를 할당
- 함수가 지정된 시간에 작동되도록 스케줄링

텍스트 입력창의 사례로 어떻게 이것이 작동되는가?

방문자가 첫 글자를 입력하고 키에서 손을 뗄 때, debounce는 우선 clearTimeout(timer)을 가지고 timer를 재설정함

이때, 스케줄에 잡은 것이 아무것도, 이 단계가 필수적이진 않음. 이후 주어진 함수인 saveInput()을 300밀리케선드마다 실행되도록 스케줄 함

만일 방문자가 계속 작성하는 동안 키에서 손을 뗄 때마다 debounce가 한 번 더 실행된ㄷㄷ다고 가정

매번 timer를 재설정한다는 것은 다시 말해 saveInput()과 함께 직전에 예정한 것을 취소하고 이 다음의 300ms라는 새로운 시간으로 다시 스케줄한다는 것

이는 방문자가 300ms 이내에 계속 키를 입력하는 한 지속됨

마지막 스케줄은 제거되지 않으므로, 마침내 saveInput()이 호출됨

### 반대의 경우 - 뒤이은 이벤트를 무시하는 방법

방금까지는 자동 저장이나 제안 옵션을 보여줄 때    좋음

but 버튼 하나를 여러 번 클릭하는 사례에서는?

마지막 클릭까지 기다리는  대신 첫 번째 클릭에서 이를 등록하고 나머지를 무시하고자 할 것

```jsx
function debounce_leading(func, timeout = 300) {
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}
```

여기서는 첫 번째로 버튼이 클릭되었을 때 발생한 첫 번째 debounce_leading 호출에서 saveInput() 함수가 동작

timer는 300ms 이후 사라지도록 설정

이 시간 내 뒤이은 모든 버튼 클릭은 이미 지정된 timer가 있으므로, timer가 사라지기까지 남은 시간을 계속해서 300ms로 초기화

### 디바운스는 어디에 사용되나?

- 키워드 검색 혹은 자동완성 기능에서 API 함수 호출 횟수를 최대한 줄이고 싶을 때
- 사용자가 창 크기 조정을 멈출 때까지 기다렸다가 resizing Event를 반영하고 싶을 때

## Throttling
원래 장애물을 이용해 유체의 흐름 속도를 늦추는 것을 의미

프로그래밍에서는 어떤 작업이 일정한 비율로만 수행되도록 과정을 느리게 하는 것

디바운싱과 매우 비슷하나 주요 차이점은 호출이 연속적으로 발생할 때, 스로틀링은 일정한 최대 속도로 작업이 수행되는 것을 보장하나, 디바운싱은 일정 시간 동안 호출이 멈출 때까지 무한히 대기한다는 점이 큰 차이

### 사례

스로틀링의 대표적인 use case는 지속적으로 업데이트 되는 다른 상태와 동기화할 때

예를 들어 scroll 이벤트를 감지하는 onScrolled 함수가 있다고 가정

scroll 이벤트는 매 픽셀이 스크롤 될 때마다 발생하므로 해당 함수는 아주 짧은 간격으로 호출됨

만약 onScrolled가 계산 비용이 큰 함수라면 초기 호출들이 이후의 호출을 제때 실행하지 못하게 막거나, 다른 작업들의 실행을 방해할 수도 있어 눈에 띄는 버벅거림이 발생할 수 있음

이런 경우 onScrolled를 스로틀해 10ms마다 최대 한 번만 호출되도록 할 수 있음

1. 첫 onScrolled leading edge라고 부름
2. 다음으로 onScrolled 호출이 만약 첫 호출로부터 10ms 이내에 이루어졌다면, 해당 호출은 첫 호출과 같은 batch에 있다고 함
3. onScrolled의 첫 호출 이후로 10ms가 지났다면, trailing edge에 도달한 것

일반적으로 onScrolled는 leading edge에서만 실행디지만, 경우에 따라 trailing edge에서도 실행되거나 양쪽 모두에서 실행되기도 함

만약 양쪽 모두에서 실행된다면 스로틀링의 구현은 보통 이전 trailing edget 이후 최소 10ms 지나야 다음 leading edge 호출이 발생하도록 보장

스로틀링을 사용하면 onScrolled 효과는 계속해서 업데이트되고 적용됨.

만약 document의 스크롤 위치에 따라 다른 DOM 요소를 이동시키는 경우, 해당 DOM 요소는 페이지를 스크롤 하는 중에도 계속 움직임. 그러나 onScrolled는 필요 이상으로 실행되지는 않음

### Network Throttling

네트워크 연결 속도를 느리게 시뮬레이션 하여 일정한 양의 데이터만 전송하도록 제한하는 것을 의미

타이머를 스로틀링한다는 것은

`Date.now()` 처럼 연속적으로 값을 읽더라도, 타이머의 정밀도를 낮추어 타이머 값이 일정한 최대 속도로만 변하도록 만드는 것을 뜻함

두 가지 모두 스로틀링이라는 일반적인 개념을 구체적으로 적용한 사례
