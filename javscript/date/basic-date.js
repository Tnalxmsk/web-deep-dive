// 오늘 기준 2025 10월 22일 수요일
const date = new Date();
console.log(date);
// output -> 2025-10-22T08:09:29.367Z

console.log(date.getFullYear());
// 2025

console.log(date.getMonth());
// 9 (0부터 시작하므로)

console.log(date.getDate());
// 22

console.log(date.getHours());
// 17

console.log(date.getMinutes());
// 10

console.log(date.getSeconds());
// 25

console.log(date.getMilliseconds());
// 859

console.log(date.getTime());
// 1761120625859

console.log(date.getDay());
// 3 (수요일)

console.log(date.toLocaleString());
// 10 /22/2025, 5:10:25 PM

console.log(date.toLocaleDateString());
// 10/22/2025

console.log(date.toDateString());
// Wd Oct 22 2025

console.log(date.toISOString());
// 2025-10-22T08:10:25.859Z

console.log(date.toJSON());
// 2025-10-22T08:13:03.342Z

date.setFullYear(2025);
date.setMonth(0);
date.setDate(11);
console.log(date);
// output -> 2025-01-11T08:14:17.666Z

console.log(date.toLocaleString());
// output -> 1/11/2025, 5:15:01 PM

console.log(date.toLocaleDateString());
// 1/11/2025
