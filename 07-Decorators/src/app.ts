function Logger(message: string) {
  return function (constructor: Function) {
    console.log(message);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    const el = document.getElementById(hookId);
    if (el) {
      const p = new constructor();
      el.innerHTML = template;
      const h1 = el.querySelector('h1');
      if (h1) {
        h1.textContent = p.name;
      }
    }
  };
}

// Class Decorator
@Logger('Logging _ person')
@WithTemplate("<h1>Hi Nathnael</h1>", "app")
class Person {
    name = "Nathnael"
    constructor(){
        console.log("Hello How Is You ?")
    }
}
const per = new Person()
console.log(per)


function Log(target:any, propertyName: string | Symbol){ // Property decorator
  console.log('Property decorator')
  console.log(target, propertyName)
}
function Log2(target: any,name: string,descriptor:PropertyDescriptor){ // Accessor Decorator
    console.log('Accessor Decorator')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}
function Log3(target: any,name: string,descriptor:PropertyDescriptor){ // Method Decorator
    console.log('Method Decorator')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}
function Log4(target: any,name: string|Symbol ,position:number){ // Parameter Decorator
    console.log('Parameter Decorator')
    console.log(target)
    console.log(name)
    console.log(position)
}


// Property Decorator

class Product {
    @Log
    title: string
    private _price :number
    @Log2
    set price(val : number){
        if(val > 0){

            this._price = val
        }else {
            throw new Error('Invalid price - shouid be')
        }
    }

    constructor(t: string, p:number){
        this._price = p
        this.title = t
    }
    @Log3
    getPriceWithTax(@Log4 tax: number){
       return this._price * (1 + tax)
    }
}