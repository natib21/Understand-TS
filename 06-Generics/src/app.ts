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


function merge<T extends object, U extends object>(obj1: T, obj2: U){ // Working With Constraints 
    return Object.assign({}, obj1, obj2);
}

const merged = merge({ Name: "Nathnael" }, { Age: 28 });
console.log(merged);

 interface Lengthy {
    length:number
 }

 function countAndDescribe<T extends Lengthy>(ele: T):[T,string]{
    let description ='Got No Value'

    if(ele.length === 1){
        description = "Got 1 Element"
    }else if(ele.length > 1){
        description = 'Got '+ ele.length +' Elements'
    }

    return [ele,description]
 }

 console.log(countAndDescribe(['man','woman']))


  //   The extends keyof syntax in TypeScript 
  //  is used to create type constraints that
  //  ensure a value is one of the keys of a given type.

 function extractAndConvert<T extends object , U extends keyof T>(obj: T,key: U ){
    return 'Value: ' + obj[key]
 }

 console.log(extractAndConvert({name: 'Max'},'name'))



