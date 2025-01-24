function Logger(log: string){
    return (constructor: Function)=>{
        console.log(log)
        console.log(constructor)

    }
}
 
function WithTemplate(template:string,hookId : string){
    return function(constructor:any) {
      const el  = document.getElementById(hookId)
      console.log(el)
      const p = new constructor()
      if(el){
          el.innerHTML = template
          el.querySelector('h1')!.textContent = p.name
      }
    }
}
@Logger('hi')
@WithTemplate("<h2>Hi Nathnael</h2>","app")
class Person {
    name = "Nathnael"
    constructor(){
        console.log("Hello How Is You ?")
    }
}
const per = new Person()
console.log(per)