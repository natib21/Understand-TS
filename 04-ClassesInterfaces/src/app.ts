class Department {
    protected employee:string[] = [];

    constructor(private readonly id : string ,public name : string){
        
    }
    describe(this:Department){
        console.log('Department '+this.id +" "+ this.name)
    }

    addEmployee(e: string){
      this.employee.push(e)
    }

    PrintEmployee(){
        console.log(this.employee.length)
        console.log(this.employee)
    }

}



class ITDepartment extends Department {

  admins:string[];

   constructor(id:string,admins:string []){
      super(id , "It");
      this.admins = admins
   }
}



class AccountingDepartment extends Department {
    private reports: string[]
    constructor(id:string, reports:string[]) {
       super(id ,"Accounting");
       this.reports = reports
    }

    addEmployee(e: string) {
        if(e === "Lisa"){
            return
        }
        this.employee.push(e)
    }
    addReports(reports:string){
        this.reports.push(reports)
    }
    printReport(){
        console.log(this.reports)
    }

}




const accounting = new ITDepartment("0001",['Max'])

accounting.addEmployee("Musk")
accounting.addEmployee("Natty")

console.log(accounting)

const AccountingDep = new AccountingDepartment("0002",["Exam Result"])

AccountingDep.addEmployee("Lisa")
AccountingDep.addEmployee("Alisa")
AccountingDep.addReports("This is the Exam Report")


console.log(AccountingDep)


































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