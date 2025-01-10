const person:{
    name: string;
    age: number;
    hobbies:string[];
    role:any[]
} = {
    name: "Nathnael",
    age:  28,
    hobbies:["Sport","Cooking"],
    role:[2,'author']
}

console.log(person.name)

for (const hobby of person.hobbies){
    console.log(hobby.toUpperCase())
}