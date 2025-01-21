"use strict";
const el = {
    name: "Nati",
    privilages: ["back-office"],
    startDate: new Date()
};
console.log(el);
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") { // Type Guard
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmployeeInformation(emp) {
    console.log('Name: ' + emp.name);
    if ('privilages' in emp) { // Type Guard
        console.log('Privilages: ' + emp.privilages);
    }
    if ('startDate' in emp) { // Type Guard
        console.log('Start Date :' + emp.startDate);
    }
}
printEmployeeInformation(el);
class Car {
    drive() {
        console.log('Diriving ....');
    }
}
class Truck {
    drive() {
        console.log('Diriving ....');
    }
    loadCargo(amount) {
        console.log('Loading Cargo ...' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) { // Type Guard 
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'hourse':
            speed = animal.RunningSpped;
            break;
    }
    console.log('Moving at Speed ' + speed);
}
moveAnimal({ type: "bird", flyingSpeed: 1200 });
const userInput = document.getElementById('user-input');
if (userInput instanceof HTMLInputElement) {
    userInput.value = 'Hi There';
}
const error = {
    email: "Not a Valid Email",
    userName: "Must Start with Capital Character"
};
