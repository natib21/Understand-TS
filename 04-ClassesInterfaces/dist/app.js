"use strict";
// 1) Interface
class Person {
    constructor(n, age) {
        this.name = n;
        this.age = age;
    }
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
}
const user1 = new Person("Nathnael", 28);
user1.greet("Hi there - I am");
console.log(user1);
