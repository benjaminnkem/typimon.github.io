/*
// Knowledge testing file

// .map
const mapArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const newArr = mapArray.map((logic) => logic * 340);
console.log(newArr);

// .call
function greetUser() {
  let greetings;
  greetings = `Hello there!, your name is ${this.name} and you are ${this.age} years old.`;

  return greetings;
}

const userData = {
  name: "Joe Smith",
  age: 45,
};

const sendGreetings = greetUser.call(userData);
console.log(sendGreetings);

// .filter
const gottenAges = [12, 16, 15, 15, 18, 19, 23, 12, 11, 30];

function adultChecker(ageValue) {
  return ageValue >= 18;
}

const adults = gottenAges.filter(adultChecker);
console.log(adults);

// .reduce
const listToReduce = [100, 25, 25];

function reducer(total, num) {
  return total - num;
}

const output = listToReduce.reduce(reducer, 2)
console.log(output);


*/