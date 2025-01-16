// 1) Interface

// 1.1) What is an Interface ?
//      It Describe the Sructure of An Object 

interface Person {
    name:string;
    age: number;

    greet(phrase: string): void

}

let user1: Person;

user1 = {
    name:"Nathnael",
    age: 28,

    greet(phrase: string){
        console.log(phrase+ ' ' + this.name)
    }
}


user1.greet("Hi there - I am")