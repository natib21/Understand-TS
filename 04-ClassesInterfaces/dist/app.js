"use strict";
class Department {
    constructor(n) {
        this.name = n;
    }
}
const accounting = new Department("Accounting");
console.log(accounting);
/*
    A class in JavaScript (and TypeScript) is a blueprint
   for creating objects that share similar properties and methods.
   It simplifies working with object-oriented programming by
   allowing you to define reusable templates for objects.
*/
/*
   A constructor is a special method of a class that is
   automatically called when creating an object from the class.

   It initializes the properties of the class.

   Here, the constructor takes a parameter (n)
   and assigns its value to the name property using this.name.
*/ 
