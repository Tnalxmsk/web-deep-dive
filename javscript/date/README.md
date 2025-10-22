# Date

## Date 객체

시간의 한 점을 플랫폼에 종속되지 않는 형태로 나타냄

자바스크립트에서 Date 객체는 1970년 1월 1일 자정과의 시간 차이를 밀리초로 나타내는 정수값 반환

Date의 최대값 → 1970년 1월 1일 UTC 기준 +- 1억일

### 생성자

```jsx
Date()

new Date()
```

함수로 호출 경우 new Date().toString()과 동일하게 현재 날짜아 시간 문자열 반환

생성자로 호출할 경우 새로운 Date 객체 반환

### 정적 메서드

```jsx
// 1970년 1일 00:00:00 로부터 지난 시간을 밀리초 단위의 숫자 값으로 반환
Date.now()

// 날짜를 나타내는 문자열 분석 후 해당 날짜와 1970년 1월 1일 00:00:00 시간 차이를
// 밀리초 단위 숫자 값으로 반환
// 브라우저 간 차이와 일관적이지 못한 동작으로 사용 권장X
Date.parse()
```

### 인스턴스 메서드

```jsx
// Date에서 현지 시간 기준 일 (1-31) 반환
Date.prototype.getDate()

// Date에서 현지 시간 기준 요일 반환
Date.prototype.getDay()

// Date에서 현지 현지 시간 기준 연도(네 자리 연도면 네자리) 반환
Date.prototype.getFullYear()

// 현지 시간 기준 시(0-23) 반환
Date.prototype.getHours()

// 현지 시간 기준 밀리초 반환
Date.prototype.getMilliseconds()

// 현지 시간 기준 분 반환
Date.prototype.getMinutes()

// 현지 시간 기준 월 반환
Date.prototype.getMonth()

// 현지 시간 기준 초 반환
Date.prototype.getSeconds()

// 현지 시간 기준 시, 밀리, 일, 월 등 설정
// ...set..위동일..()

// Date 날짜 부분만 나타내는 사람이 읽을 수 있는 문자열 반환
Date.prototype.toDateString()

// toISOString()을 사용해 Date를 나타내는 문자열 반환
// JSON.stringfy() 에서 사용
Date.prototype.toJSON()

// Date를 나타내는 문자열을 현재 지역의 형식으로 반환
// Object.prototype.toLocaleString() 메서드 재정의
Date.prototype.toLocaleString()

// Date 시간 부분을 나타내는 문자열을 시스템에 설정된 현재 지역 형식으로 반환
Date.prototype.toLocaleTimeString()

// Date를 나타내는 시간 문자열 반환
// Object...를 통해 메서드를 재정의
Date.prototype.toString()
```

## 예제

### Date 객체 생성 방법

```jsx
let totady = newDate();
let birtday = new Date("December 17, 1995 03:24:00");
let birthday = new Date("1995-12-17T03:24:00");
let birthday = new Date(1995, 11, 17); // 월 0부터 시작
let birthday = new Date(1995, 11, 17, 3, 24, 0);
```

### 두자리 연도 1900년대로

Date 연도에 0부터 99까지 정수 제공하면 1900부터 1999 처리

1900년대가 아닌 실제 0 ~ 99년 지정해야 한다면

Date.prototype.setFullYear(), Date.prototype.getFullYear() 메서드 사용

```jsx
let date = new Date(98, 1) // Sun Feb 01 1998 00:00:00 GMT+0900 (대한민국 표준시)

// 구형 메서드: 여기서도 98을 1998로 처리
date.setYear(98); // Sun Feb 01 1998 00:00:00 GMT+0900 (대한민국 표준시)

date.setFullYear(98); // Sat Feb 01 0098 00:00:00 GMT+0827 (대한민국 표준시)
```

### 경과 시간 계산

두 JS 날짜의 간격을 밀리초로 나타냄

단, 연 월 일의 길이가 계속해서 달라지므로 두 시간의 간격을 시 분초보다 큰 단위로 나타낼 때 여러 문제가 생겨 관련 문제 찾아봐야함

```jsx
let start = Date.now();

// 시간이 걸리는 어떠한 작업
doSomethingForALongTime();
let end = Date.now();
let elapsed = end - start; // 밀리초로 나타낸 경과 시간
```

```jsx
let start = new Date();

// 시간이 걸리는 어떠한 작업
doSomethingForALongTime();
let end = new Date();
let elapsed = end.getTime() - start.getTime() // 밀리초로 나타낸 경과 시간
```

```jsx
// 임의 함수 테스트하고, 호출에 걸린 시간 출력하려면?
function printElapsedTime(fTest) {
  let nStartTime = Date.now(),
    vReturn = fTest(),
    nEndTime = Date.now;
    
    console.log(`Elapsed time: ${string(nEndTime - nStartTime)} milliseconds`);
    return vReturn;
}

let yourFunctionReturn = printElapsedTime(yourFunction);
```

### ECMAScript 시간으로부터 경과 시간 초단위 가져오기

```jsx
let seconds = Math.floor(Date.now() / 1000);
```

정수만 반환하는 것이 중요하므로 단순히 나누기만 하지 않음

실제 지나간 초를 반환해야 하기 때문에 Math.round 사용하지() 않고 Math.floor() 사용

# Intl.DateTimeFormat

언어에 맞는 날짜 및 시간 서식을 적용하기 위한 객체

```jsx
const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 17, 738));

console.log(new Intl.DateTimeFormat("en-US").format(date));
// Expected output: "12/20/2020"

console.log(new Intl.DateTimeFormat(["ban", "id"]).format(date));
// Expected output: "20/12/2020"

console.log(
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Australia/Sydney",
  }).format(date),
)
// Expected output: "Sunday, 20 December 2020 at 14:23:16 GMT+11"

// Run Result
> "12/20/2020"
> "20/12/2020"
> "Sunday 20 December 2020 at 14:23:16 GMT+11";
```

### 생성자

```jsx
// 새로운 Intl.DateTimeFormat 객체 생성
Intl.DateTimeFormat()
```

### 인스턴스 메서드

```jsx
// DateTimeFormat 객체의 로케일과 서식 옵션에 맞춰 날짜를 서식화해 반환
Intl.DateTimeFormat.prototype.format()

const options1 = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const dateTimeFormat3 = new Intl.DateTimeFormat("en-US", options1);
console.log(dateTimeFormat3.format(date1));
// Expected output: "Friday, June 1, 2012"
```

## 예제

### DateTimeFormat 사용하기

로케일을 지정하지 않고 사용 시 기본 로케일과 기본 옵션의 서식을 적용한 문자열 반환

```jsx
var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

// 매개변수 없이 toLocaleString() 호출한 결과는
// 구현체, 기본 로케일, 기본 시간대에 따라 달라짐
console.log(new Intl.DateTimeFormat().format(date));
// -> koKR 로케일과 Asia/Seoul 시간대 (UTC+0900) 에서
"2012. 12. 20."
```

### 로케일 지정하기

지역화된 숫자 서식 방법

사용자 언어에 적합한 서식 적용하려면 locales 매개변수로 해당 언어를 제공

```jsx
var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

// 아래 결과는 모두 Asia/Seoul 시간대를 사용한 결과 (UTC+0900, 한국 표준시)

// 한국어에서 날짜 표기는 연월일 순서
console.log(new Intl.DateTimeFormat("ko-KR").format(date));
// → "2012. 12. 20."

// 미국 영어에서 날짜 표기는 월일년 순서
console.log(new Intl.DateTimeFormat("en-US").format(date));
// → "12/20/2012"

// 영국 영어에서 날짜 표기는 일월년 순서
console.log(new Intl.DateTimeFormat("en-GB").format(date));
// → "20/12/2012"

// 대부분의 아랍어 국가에서는 진짜 아라비아 숫자 사용
console.log(new Intl.DateTimeFormat("ar-EG").format(date));
// → "٢٠‏/١٢‏/٢٠١٢"

// 일본어의 경우 어플리케이션에 연호를 사용해야 할 수도 있음
// 2012년은 헤이세이 24년
console.log(new Intl.DateTimeFormat("ja-JP-u-ca-japanese").format(date));
// → "24/12/20"

// 발리어와 같이 지원되지 않을 수도 있는 언어를 지정할 때는
// 다음과 같이 대체 언어를 지정할 수 있음. 아래의 경우 대체 언어는 인도어
console.log(new Intl.DateTimeFormat(["ban", "id"]).format(date));
// → "20/12/2012"
```

### 옵션 지정하기

options 매개변수를 지정하면 날짜와 시간 서식 결과를 원하는 형태로 바꿀 수 있음

```jsx
var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

// 긴 날짜 서식에 더해 요일 요청
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
console.log(new Intl.DateTimeFormat("de-DE", options).format(date));
// → "Donnerstag, 20. Dezember 2012"

// 어플리케이션이 GMT를 사용해야 하고, 그 점을 명시해야 할 때
options.timeZone = "UTC";
options.timeZoneName = "short";
console.log(new Intl.DateTimeFormat("en-US", options).format(date));
// → "Thursday, December 20, 2012, GMT"

// 좀 더 자세한 설정이 필요하면
options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Australia/Sydney",
  timeZoneName: "short",
};
console.log(new Intl.DateTimeFormat("en-AU", options).format(date));
// → "2:00:00 pm AEDT"

// 미국에서도 24시간제가 필요할 때
options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "America/Los_Angeles",
};
console.log(new Intl.DateTimeFormat("en-US", options).format(date));
// → "12/19/2012, 19:00:00"

// 옵션을 지정하면서 로케일은 브라우저 기본값을 사용하고 싶을 땐 'default' 지정
console.log(new Intl.DateTimeFormat("default", options).format(date));
// → "2012. 12. 19. 19시 0분 0초"

// 오전/오후 시간 표시가 필요할 때
options = { hour: "numeric", dayPeriod: "short" };
console.log(new Intl.DateTimeFormat("en-US", options).format(date));
// → 10 at night
```

참고
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
