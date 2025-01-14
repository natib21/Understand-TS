"use strict";
////////////////////////////////////////
// 1) Arrow Function
const add = (a, b) => {
    let result;
    result = a + b;
    return result;
};
const val = add(5, 6);
console.log(val);
// 1.2) Default Function Parameters
const addD = (a, b = 1) => {
    return a + b;
};
console.log(addD(10));
// 1.3) Rest Parameters
const addR = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addNumbers = addR(4, 5, 20, 11);
console.log(addNumbers);
///////////////////////////////////////
// 2) The Spread Operator
// 2.1) Array Spread Operator
const hobbies = ["Sport", "Music"];
const activeHobbies = ["Hiking"];
activeHobbies.push(...hobbies);
console.log(activeHobbies);
// 2.2) Object Spread Operator
const person = {
    firstName: "Nati",
    age: 28
};
const copiedPerson = Object.assign({}, person);
console.log(copiedPerson);
//////////////////////////////////////
// 3) Array & Object Destructuring
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);
const { firstName, age } = person;
console.log(firstName);
