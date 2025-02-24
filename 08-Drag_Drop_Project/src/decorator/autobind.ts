export function autobind(target:any,methodName:string,descriptor:PropertyDescriptor){
    const originalMethod = descriptor.value
   //  console.log(originalMethod)
    const adjDescriptor: PropertyDescriptor = {
       configurable:true,
       get(){
           const boundFn = originalMethod.bind(this)
           return boundFn
       }
    }
    return adjDescriptor
   }