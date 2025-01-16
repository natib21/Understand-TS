"use strict";
// 1) Interface
let user1;
user1 = {
    name: "Nathnael",
    age: 28,
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
};
user1.greet("Hi there - I am");
