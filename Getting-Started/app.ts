function add(n1:number,n2:number,showResult:boolean,phrase :string){

    const result = n1 + n2;
    if(showResult){
        console.log(phrase + result)
    }else{
        return n1 + n2;
    }
}
const num1 = 20;
const num2 = 35;
const printResult = true
const resultPhrase= 'Result is: '

add(num1,num2,printResult,resultPhrase)

// Type Inference is a process that automatically assigns types to variables, functions, and constants in a program

// Union Types

type Combinable = number | string

function combine(input1 : Combinable, input2 : Combinable){
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number'){
        result = input1 + input2
    }else {
        result = input1.toString() + input2.toString()
    }

    return result
}


const combineInput = combine(10,20)
console.log(combineInput)

const combineInputS = combine("Nati","Betty")
console.log(combineInputS)
