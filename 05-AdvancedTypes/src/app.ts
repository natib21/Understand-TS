type Admin = {
    name:string,
    privilages:string[]
}

type Employee = {
    name:string
    startDate:Date
}

type ElevatedEmployee = Admin & Employee // intersection types

const el : ElevatedEmployee = {
    name: "Nati",
    privilages:["back-office"],
    startDate: new Date()
}

console.log(el)

type Combinable = string | number
type Numeric = number | boolean

type Universal = Combinable & Numeric  // intersection Types


function add ( a: Combinable , b: Combinable){
    if(typeof a === "string" || typeof b === "string"){ // Type Guard
        return a.toString() + b.toString()
    }
    return a + b
}

type UnknownEmployee = Admin | Employee

function printEmployeeInformation(emp: UnknownEmployee){
    console.log('Name: '+emp.name)

    if('privilages' in emp){  // Type Guard
        console.log('Privilages: '+ emp.privilages) 
    }

    if('startDate' in emp){  // Type Guard
        console.log('Start Date :'+ emp.startDate)
    }

}

printEmployeeInformation(el)

class Car {
    drive() {
        console.log('Diriving ....')
    }
}

class Truck {
        drive() {
        console.log('Diriving ....')
    }

    loadCargo(amount:number){
        console.log('Loading Cargo ...'+amount)
    }
}

type Vehicle = Car | Truck

const v1  = new Car()
const v2 = new Truck()

function useVehicle(vehicle:Vehicle){
  vehicle.drive()

  if ( vehicle instanceof Truck){ // Type Guard 
    vehicle.loadCargo(1000)
  }

}