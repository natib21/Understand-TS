"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employee = [];
    }
    describe() {
        console.log('Department ' + this.id + " " + this.name);
    }
    addEmployee(e) {
        this.employee.push(e);
    }
    PrintEmployee() {
        console.log(this.employee.length);
        console.log(this.employee);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "It");
        this.admins = admins;
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
    }
    addEmployee(e) {
        if (e === "Lisa") {
            return;
        }
        this.employee.push(e);
    }
    addReports(reports) {
        this.reports.push(reports);
    }
    printReport() {
        console.log(this.reports);
    }
}
const accounting = new ITDepartment("0001", ['Max']);
accounting.addEmployee("Musk");
accounting.addEmployee("Natty");
console.log(accounting);
const AccountingDep = new AccountingDepartment("0002", ["Exam Result"]);
AccountingDep.addEmployee("Lisa");
AccountingDep.addEmployee("Alisa");
AccountingDep.addReports("This is the Exam Report");
console.log(AccountingDep);
/*
    A class in JavaScript (and TypeScript) is a blueprint
   for creating objects that share similar properties and methods.
   It simplifies working with object-oriented programming by
   allowing you to define reusable templates for objects.
*/
/*
   A constructor is a special method of a class that is
   automatically called when creating an object from the class.

   It initializes the properties of the class.

   Here, the constructor takes a parameter (n)
   and assigns its value to the name property using this.name.
*/ 
