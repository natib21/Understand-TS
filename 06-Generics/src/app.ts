// Generics 

// What are Generics ?
//    in TypeScript (and other programming languages
//  like Java and C#) are a way to create reusable
//  and flexible components, such as functions, classes,
//  and interfaces, that can work with any data type while 
//  still enforcing type safety. Generics allow you 
//  to define types that can be used with different data types
//  without losing the benefits of type checking.

const names: Array<string> =[]   // Building Generics


function merge<T, U>(obj1: T, obj2: U){
    return Object.assign({}, obj1, obj2);
}

const merged = merge({ Name: "Nathnael" }, { Age: 28 });
console.log(merged);

