class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.items.length === 0) {
      throw new Error('Stack is empty');
    }
    return this.items.pop();
  }

  peek() {
    if (this.items.length === 0) {
      console.log('Stack is empty');
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

const isValidParentheses = (str) => {
  const strArr = str.split('');
  const stack = new Stack();

  strArr.forEach((char) => {
    if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      if (stack.isEmpty()) {
        return false;
      }
      stack.pop();
    }
  });
  return stack.isEmpty();
};

console.log(isValidParentheses('((a+b)*c)'));
console.log(isValidParentheses('((a+b)*c+d'));


// 입력된 숫자를 차례대로 배열에 담는다
// 왼쪽 방향으로 하나씩 이동해 하면서 자신보다 큰 값인지 비교한다
// 자신보다 큰 값이라면 해당 인덱스의 값을 저장하고 아니라면 0 저장하고 pop

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'read.txt';
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');

const n = Number(input[0]);
const heights = input[1].split(' ').map(Number);
const result = Array(n).fill(0);

const stack = [];
/*
// O(n^2)
for (let i = 1; i < n; i++) {
  for (let j = i - 1; j >= 0; j--) {
    if (heights[j] > heights[i]) {
      result[i] = j + 1;
      break;
    }
    if (!result[i]) {
      result[i] = 0;
    }
  }
}

console.log(result.join(' '));*/

for (let i = 0; i < n; i++) {
  // 현재 탑의 높이
  const h = heights[i];

  // 현재 탑보다 작거나 같은 탑들은 스택에서 제거
  // 높은 탑만 레이저에서 수신한다.
  while (stack.length && stack[stack.length - 1][0] <= h) {
    stack.pop();
  }

  // 스택이 비어 있지 않으면
  // 스택의 top에 위치한 탑이 현재 탑의 레이저를 수신하는 탑
  // 따라서 그 탑의 index를 가져와 + 1한다 (+1은 문제에서 0은 없고 첫번째 요소는 1로 저장하므로)
  if (stack.length) {
    result[i] = stack[stack.length - 1][1] + 1;
  } else {
    result[i] = 0;
  }
  stack.push([h, i]);
}

console.log(result.join(' '));
