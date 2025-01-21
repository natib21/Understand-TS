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

useVehicle(v1)
useVehicle(v2)


interface Bird {
 type:'bird' // Type Guard one common property
 flyingSpeed : number
}

interface Hourse{
type:'hourse' // Type Guard one common property
RunningSpped:number
}

type Animal = Bird | Hourse

function moveAnimal(animal:Animal){
 let speed;

 switch(animal.type){
    case 'bird':
        speed = animal.flyingSpeed
        break;
    case 'hourse':
        speed = animal.RunningSpped
        break;    
 }
 console.log('Moving at Speed ' + speed)
}

moveAnimal({type:"bird",flyingSpeed:1200})

const userInput = document.getElementById('user-input')
  if(userInput instanceof HTMLInputElement){
    userInput.value = 'Hi There';
  }

interface ErrorContainer {
    [prop:string] : string // In TypeScript, the index signature (or index property) is used to define types for properties that are not known in advance but follow a specific pattern or type.
}


const error :ErrorContainer = {
  email:"Not a Valid Email",
  userName:"Must Start with Capital Character"
}