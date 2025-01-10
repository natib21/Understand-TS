const person:{
    name: string;
    age: number;
    hobbies:string[];
} = {
    name: "Nathnael",
    age:  28,
    hobbies:["Sport","Cooking"]
}

console.log(person.name)

for (const hobby of person.hobbies){
    console.log(hobby.toUpperCase())
}