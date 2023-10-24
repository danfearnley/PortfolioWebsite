// calculator = (button) => {
//     let firstNumber = parseInt(document.getElementById("firstNumber").value);
//     let secondNumber = parseInt(document.getElementById("secondNumber").value);
//     let operand = document.getElementById("operand").value;
//     let result;
//     switch (operand) {
//         case "+":
//             result = firstNumber + secondNumber;
//             break;
//         case "-":
//             result = firstNumber - secondNumber;
//             break;
//         case "x":
//             result = firstNumber * secondNumber;
//             break;
//         case "÷":
//             result = firstNumber / secondNumber;
//             break;
//         case "%":
//             result = firstNumber % secondNumber;
//             break;
//     }

//     document.getElementById("output").innerText = `${firstNumber} ${operand} ${secondNumber} = ${result}`
// }

let firstNumber = [];
let secondNumber = [];
let operand;
let sumArray = [];
let totalSum;

numberButton = (numberButtonID) => {
    if (totalSum !== undefined) allClearButton();

    if (document.getElementById("typedDisplay").innerHTML.length < 14) {
        if (secondNumber.length == 0 && operand === undefined ) {
            if (numberButtonID === "decimal") {
                if (!firstNumber.join("").includes(".")) firstNumber.push(".");
            } else {
                firstNumber.push(numberButtonID);
            }

            document.getElementById("typedDisplay").innerHTML = firstNumber.join("");
        } else {
            if (numberButtonID === "decimal") {
                secondNumber.push(".");
            } else {
                secondNumber.push(numberButtonID);
            }

            if (operand !== undefined) {
                document.getElementById("enteredDisplay").innerHTML = `${firstNumber.join("")} ${operand}`;
                operand = undefined;
            }

            document.getElementById("typedDisplay").innerHTML = secondNumber.join("");    
        }
    }
}

operandButton = (operandButtonID) => {
    if (document.getElementById("typedDisplay").innerHTML === "+" ||
        document.getElementById("typedDisplay").innerHTML === "-" ||
        document.getElementById("typedDisplay").innerHTML === "x" ||
        document.getElementById("typedDisplay").innerHTML === "÷" ||
        document.getElementById("typedDisplay").innerHTML === "%") {
        // Do nothing as operand already entered
    } else if (secondNumber === undefined || secondNumber.length == 0) {
        firstNumber = document.getElementById("typedDisplay").innerHTML.split("");

        if (firstNumber != "") {
            document.getElementById("enteredDisplay").innerHTML = firstNumber.join("");
            document.getElementById("typedDisplay").innerHTML = operandButtonID;

            operand = operandButtonID;
        } else {
            firstNumber = []; // Ensure a blank item isnt created in the array
        }
    } else {
        equalsButton();
        firstNumber = document.getElementById("typedDisplay").innerHTML.split("");
        document.getElementById("enteredDisplay").innerHTML = firstNumber.join("");
        document.getElementById("typedDisplay").innerHTML = operandButtonID;
        secondNumber = [];
        totalSum = undefined;
        operand = operandButtonID;
    }
}

equalsButton = () => {
    let firstNumberInt;
    let secondNumberInt;
    let exponentSum;
    
    sumArray = document.getElementById("enteredDisplay").innerHTML.split("");

    operand = sumArray.pop();

    if (operand !== "=") {
        firstNumberInt = parseFloat(sumArray.join(""));
        secondNumberInt = parseFloat(secondNumber.join(""));

        switch (operand) {
            case "+":
                totalSum = firstNumberInt + secondNumberInt;
                break;
            case "-":
                totalSum = firstNumberInt - secondNumberInt;
                break;
            case "x":
                totalSum = firstNumberInt * secondNumberInt;
                break;
            case "÷":
                totalSum = firstNumberInt / secondNumberInt;
                break;
            case "%":
                totalSum = firstNumberInt % secondNumberInt;
                break;
        }

        document.getElementById("enteredDisplay").innerHTML = `${firstNumberInt} ${operand} ${secondNumberInt} =`;
        if (totalSum % 1 == 0) {
            if (totalSum.toString().length > 14) {
                exponentSum = totalSum.toExponential();
                
                if (exponentSum.toString().length > 14) {
                    alert("Result exceeded length");
                    allClearButton();
                } else {
                    document.getElementById("typedDisplay").innerHTML = exponentSum;
                }
            } else {
                document.getElementById("typedDisplay").innerHTML = totalSum;
            }
        } else {
            document.getElementById("typedDisplay").innerHTML = +parseFloat(totalSum).toFixed(13);
        }
    }
}

clearButton = () => {
    let popped;

    if (totalSum === undefined) {
        if (secondNumber.length > 0) {
            popped = secondNumber.pop();
            if (secondNumber.length > 0) {
                document.getElementById("typedDisplay").innerHTML = secondNumber.join("");
            } else {
                document.getElementById("typedDisplay").innerHTML = firstNumber.join("");
                document.getElementById("enteredDisplay").innerHTML = "";
            }
        } else if (operand !== undefined) {
            operand = undefined;
            document.getElementById("typedDisplay").innerHTML = firstNumber.join("");
            document.getElementById("enteredDisplay").innerHTML = "";
        } else if (firstNumber.length > 0) {
            popped = firstNumber.pop();
            if (firstNumber.length > 0) {
                document.getElementById("typedDisplay").innerHTML = firstNumber.join("");
            } else {
                allClearButton();
            }
        }
    } else {
        allClearButton();
    }
}

allClearButton = () => {
    firstNumber = [];
    operand = undefined;
    secondNumber = [];
    totalSum = undefined;

    document.getElementById("typedDisplay").innerHTML = "";
    document.getElementById("enteredDisplay").innerHTML = "";
}