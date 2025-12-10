setTimeout(() => console.log("T1"), 0);

Promise.resolve().then(() => console.log("M1"));

setTimeout(() => console.log("T2"), 0);

Promise.resolve().then(() => console.log("M2"));

console.log("S");
