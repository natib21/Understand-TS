function Logger(message: string) {
  return function (constructor: Function) {
    console.log(message);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string)  {
  return function<T extends {new(...args: any[]):{name:string}}> (originalConstructor: T)     {
    return class extends originalConstructor     {
        constructor(...args: any[])   {
         super()
         const el = document.getElementById(hookId);
         if (el)     {
         
         el.innerHTML = template;
         const h1 = el.querySelector('h1');
         if (h1)    {
         h1.textContent = this.name;
        }
     }
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
function Autobind(_:any,_2: string,descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable:true,
        enumerable:false,
        get(){
          const boundFn = originalMethod.bind(this)
          return boundFn
        },
    }
    return adjDescriptor
}
class Printer {
    message = 'This Works !'
    @Autobind
    showMessage(){
        console.log(this.message)
    }
}
const p = new Printer()
const btn = document.querySelector('button')!
console.log(btn)
btn?.addEventListener('click',p.showMessage)