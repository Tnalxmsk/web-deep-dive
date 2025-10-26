function add(x, y) {
  return x + y;
}

console.dir(add);
console.log(add(2, 5));

var sum = function sumByNumbers(...args) {
  console.log(sumByNumbers === sum) // true
  return args.reduce((a, b) => a + b, 0);
};

console.log(sum(1, 2, 3, 4, 5)); // 15


console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sumByNumbers(1, 2, 3, 4, 5));

// 익명 함수 리터럴 (anonymous function literal)
const a = function () {
  console.log('익명 함수');
};

// 기명 함수 리터럴 (named function literal)
const b = function sayHello() {
  console.log('기명 함수');
};

console.log(a.name);
console.log(b.name);
console.log(sum.name)
