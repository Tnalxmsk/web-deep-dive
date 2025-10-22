// 오늘 날짜를 YYYY-MM-DD 형식 변환
const formatDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const mm = now.getMonth() + 1;
  // 0 붙이려면
  // const mm = String(mm).padStart(2, '0');
  const dd = now.getDate();
  // 0붙이려면
  // const dd = String(dd).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
};

console.log(formatDate());
// output -> 2022-01-01


// MM-DD-YYYY 형식 변환
const formatDate2 = () => {
  const now = new Date(2025, 8, 11);
  const date = now.toLocaleDateString().replace(/\//g, '-');
  return date;
};
console.log(formatDate2());
// output -> 9-11-2025

// 년-월-일-요일 포맷
const formatDate3 = (date) => {
  const yy = date.getFullYear();
  const mm = date.getMonth();
  const dd = date.getDate();
  const day = date.getDay();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const formatedDay = dayNames[day];
  return `${yy}-${mm}-${dd} ${formatedDay}`;
};

const date1 = new Date();
console.log(formatDate3(date1));
// output -> 2025-9-22 수


// yyyy년 y월 y일 y요일
const formatDateByString = (stringDate) => {
  const [year, month, day] = stringDate.split('-');
  const date = new Date(year, month - 1, day);
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const formatedDay = dayNames[date.getDay()];
  return `${year}년 ${month}월 ${day}일 ${formatedDay}요일`;
};

const stringDate = '2025-9-22';
console.log(formatDateByString(stringDate));
// output - > 2025-9-22 월요일

// Intl 사용한 yyyy년 y월 y일 y요일
const formatDateByIntl = (date) => {
  // options를 통해 필요한 포맷팅 설정이 가능하다
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };

  //option 없을 시 -> 2025. 10. 22.
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

// today
const date2 = new Date();
console.log(formatDateByIntl(date2));
// output -> 2025년 10월 22일 수요일
// Intl을 사용하면 간단하게 년 월 일 요일 포맷팅이 가능하다

// Intl 사용한 yyyy년 y월 y일 y요일 오후 t:m:s
const formatDateByIntl2 = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

console.log(formatDateByIntl2(date2));
// output -> 2025년 10월 22일 수요일 오후 5:45:16

// RelativeTimeFormat
const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });

console.log(rtf.format(-3, 'day'));
// output -> 3일 전

console.log(rtf.format(10, 'day'));
// output -> 3일 전

// 오늘 기준 며칠 전인지 계산
const formatRelativeDate = (targetDate) => {
  const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });
  const now = new Date();
  // 밀리초 단위 차이 계산
  const diff = targetDate - now;

  // 1일 = 24시간 = 60분 X 24시간 = 60 * 60 * 24 * 1000
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return rtf.format(days, 'day');
};

console.log(formatRelativeDate(new Date(2025, 9, 23)));
