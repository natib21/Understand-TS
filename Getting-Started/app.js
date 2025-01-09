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
