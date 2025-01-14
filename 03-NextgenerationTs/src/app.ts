
////////////////////////////////////////
// 1) Arrow Function

const add =(a:number ,b:number)=>{
    let result ;
    result = a + b
    return result
}

const val = add(5,6)
console.log(val)


// 1.2) Default Function Parameters

const addD = (a:number,b:number = 1) => {
    return a + b
}

console.log(addD(10))


///////////////////////////////////////