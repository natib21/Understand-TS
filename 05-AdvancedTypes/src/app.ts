type Admin = {
    name:string,
    privilages:string[]
}

type Employee = {
    name:string
    startDate:Date
}

type ElevatedEmployee = Admin & Employee

const el : ElevatedEmployee = {
    name: "Nati",
    privilages:["back-office"],
    startDate: new Date()
}

console.log(el)