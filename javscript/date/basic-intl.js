const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

console.log(new Intl.DateTimeFormat('ko-KR', options).format(date));
// output -> 2012년 12월 20일 목요일

// 좀 더 자세한 설정
options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  // 24시간제 필요할 경우 true
  // hour12: false,
  timeZone: "Asia/Seoul",
};
console.log(new Intl.DateTimeFormat('ko-KR', options).format(date));
// output -> 오후 12시 0분 0초

// 옵션 지정하지 않으면 로케일 브라우저 기본값
console.log(new Intl.DateTimeFormat('default', options).format(date));
// output -> 2012년 12월 20일 목요일
// 오후 12:00:00
// 12:00:00 PM
