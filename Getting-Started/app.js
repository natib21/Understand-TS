///////////////////////////////////////////////////
// 1. This is a function that describe data type in function parameter 
function add(n1, n2, showResult, phrase) {
    var result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return n1 + n2;
    }
}
var num1 = 20;
var num2 = 35;
var printResult = true;
var resultPhrase = 'Result is: ';
add(num1, num2, printResult, resultPhrase);
// Type Inference is a process that automatically assigns types to variables, functions, and constants in a program
////////////////////////////////////////////////////////////
// Type Aliases
function Aliases() {
    function combine(input1, input2) {
        var result;
        if (typeof input1 === 'number' && typeof input2 === 'number') {
            result = input1 + input2;
        }
        else {
            result = input1.toString() + input2.toString();
        }
        return result;
    }
    var combineInput = combine(10, 20);
    console.log(combineInput);
    var combineInputS = combine("Nati", "Betty");
    console.log(combineInputS);
}
/////////////////////////////////////////////////////////////
// Union Types
function combine(input1, input2) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var combineInput = combine(10, 20);
console.log(combineInput);
var combineInputS = combine("Nati", "Betty");
console.log(combineInputS);
////////////////////////////////////////////////////////////
// Function Return Type 
function adder(n1, n2) {
    return n1 + n2;
}
// void doesn't return anything 
function printResult2(num) {
    console.log('result: ' + num);
}
printResult2(adder(10, 34));
/////////////////////////////////////////////////////////////
// Function as Type 
var combinedValues;
combinedValues = adder;
console.log(combinedValues(8, 8));
