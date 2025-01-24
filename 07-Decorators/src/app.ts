function Logger(constructor: Function){
    console.log('Logging...')
    console.log(constructor)
}


@Logger
class Person {
     name = "Nathnael"

    constructor(){
        console.log("Hello How Is You ?")
    }
}

const per = new Person()
console.log(per)