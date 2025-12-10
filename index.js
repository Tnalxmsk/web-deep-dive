/*var name = 'SOHYUN';

const person = {
  name: 'JISUNG',
  printName() {
    console.log(this);
    setTimeout(function () {
      console.log("callback's this.name: ", this.name);
    }.bind(this), 100);
  },
};

const anotherPerson = {
  name: 'NAEUN',
};
anotherPerson.printName = person.printName;

person.printName();
anotherPerson.printName();*/

/*const counter = (function createAgeTracker(ageModifier) {
  let age = 23;

  return {
    eatTteokguk: function () {
      return ++age;
    },
    undoEatingTteokguk: function () {
      return --age;
    },
  };
})();

console.log(counter.eatTteokguk());
console.log(counter.eatTteokguk());
console.log(counter.eatTteokguk());
console.log(counter.eatTteokguk());
console.log(counter.undoEatingTteokguk());
console.log(counter.undoEatingTteokguk());
console.log(counter.undoEatingTteokguk());  // 하은의 기대: 24*/

/*class Counter {
  static #age = 23;

  static eatTteokguk() {
    return ++this.#age;
  }

  static undoEatingTteokguk() {
    return --this.#age;
  }
}

console.log(Counter.eatTteokguk());
console.log(Counter.eatTteokguk());
console.log(Counter.eatTteokguk());
console.log(Counter.eatTteokguk());
console.log(Counter.undoEatingTteokguk());
console.log(Counter.undoEatingTteokguk());
console.log(Counter.undoEatingTteokguk());*/

/*const person = {
  name: 'JISUNG',
  printName() {
    console.log(this);
    setTimeout(() => {
      console.log("callback's this.name: ", this.name);
    }, 100);
  },
};

const anotherPerson = {
  name: 'NAEUN',
};
anotherPerson.printName = person.printName;

person.printName();
anotherPerson.printName();*/

/*function Button(props) {
  const clickHandler = () => {
    console.log(props.id);
  };
  return <button onClick={clickHandler}>클릭</button>;
}*/
