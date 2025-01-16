"use strict";
// 1) Interface
let add;
add = (a, b) => {
    return a + b;
};
class Person {
    constructor(n, age) {
        this.name = n;
        this.age = age;
    }
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
}
let user1;
user1 = new Person("Nathnael", 28);
user1.greet("Hi there - I am");
console.log(user1);
