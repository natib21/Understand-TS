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
