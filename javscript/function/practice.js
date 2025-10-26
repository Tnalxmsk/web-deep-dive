const obj = {};
const func = function (a, b) {
  return a + b;
};

console.log(typeof obj);   // "object"
console.log(typeof func);  // "function"

// 일반 객체에는 없음
console.log(obj.length);   // undefined
console.log(obj.name);     // undefined
console.log(obj.prototype); // undefined

// 함수 객체에는 있음
console.log(func.length);  // 2
console.log(func.name);    // "func"
console.log(func.prototype); // { constructor: f }
console.log(Object.getOwnPropertyNames(func.prototype));

function Foo() {}

console.log(Object.getOwnPropertyDescriptor(Foo.prototype, 'constructor'));
console.log(Foo.prototype);

Object.defineProperty(Foo.prototype, 'constructor', {
  enumerable: true
});
console.log(Foo.prototype);
