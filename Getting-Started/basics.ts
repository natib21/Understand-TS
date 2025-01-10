
enum Role {ADMIN,READ_ONLY,AUTHOR}
const person = {
    name: "Nathnael",
    age:  28,
    hobbies:["Sport","Cooking"],
    role:Role.AUTHOR
}

console.log(person.name)

for (const hobby of person.hobbies){
    console.log(hobby.toUpperCase())
}
if (person.role === Role.AUTHOR){
 console.log('is author')
}