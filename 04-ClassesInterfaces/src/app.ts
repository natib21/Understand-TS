// 1) Interface

// 1.1) What is an Interface ?
//      It Describe the Sructure of An Object 

interface Named {
 readonly name:string;
}


interface Greetable extends Named {
   
    greet(phrase: string): void

}

class Person implements Greetable{
   
    name:string;
    age:number
    constructor(n: string,age :number){
        this.name = n
        this.age = age
    }

    greet(phrase: string) {
        console.log(phrase+ ' ' + this.name)
    }

}
let user1: Greetable
user1 = new Person("Nathnael",28)

user1.greet("Hi there - I am")
console.log(user1)