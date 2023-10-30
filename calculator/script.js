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
    if (totalSum !== undefined) allClearButton(); // Clear everything if we have a total

    if (document.getElementById("typedDisplay").innerHTML.length < 14) { // Max visible char is 14
        if (secondNumber.length == 0 && operand === undefined ) { // Entering first number
            if (numberButtonID === "decimal") {
                if (!firstNumber.join("").includes(".")) firstNumber.push("."); // Check if number already has a decimal
            } else {
                firstNumber.push(numberButtonID);
            }

            document.getElementById("typedDisplay").innerHTML = firstNumber.join(""); // Display entered number
        } else { // Entering second number
            if (numberButtonID === "decimal") {
                if (!secondNumber.join("").includes(".")) secondNumber.push(".");
            } else {
                secondNumber.push(numberButtonID);
            }

            if (operand !== undefined) {
                document.getElementById("enteredDisplay").innerHTML = `${firstNumber.join("")} ${operand}`; // Move the entered first number and operand to top row
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
    } else if (secondNumber === undefined || secondNumber.length == 0) { // No second number entered
        firstNumber = document.getElementById("typedDisplay").innerHTML.split("");

        if (firstNumber != "") {
            document.getElementById("enteredDisplay").innerHTML = firstNumber.join(""); // Move entered number to top display
            document.getElementById("typedDisplay").innerHTML = operandButtonID; // Add operand to bottom display

            operand = operandButtonID;
        } else {
            firstNumber = []; // Ensure a blank item isnt created in the array
        }
    } else {
        equalsButton(); // Work out the sum as second number entered
        firstNumber = document.getElementById("typedDisplay").innerHTML.split(""); // first number is now the result of first sum
        document.getElementById("enteredDisplay").innerHTML = firstNumber.join("");
        document.getElementById("typedDisplay").innerHTML = operandButtonID;
        secondNumber = []; // reset second number
        totalSum = undefined; // reset total
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

        document.getElementById("enteredDisplay").innerHTML = `${firstNumberInt} ${operand} ${secondNumberInt} =`; // Show sum in top display
        if (totalSum % 1 == 0) { // Sum is whole?
            if (totalSum.toString().length > 14) { // More than 14 chars
                exponentSum = totalSum.toExponential(); // Covert to exponent
                
                if (exponentSum.toString().length > 14) { // If still more than 14, show error
                    alert("Result exceeded length");
                    allClearButton(); // Clear everything
                } else {
                    document.getElementById("typedDisplay").innerHTML = exponentSum;
                }
            } else {
                document.getElementById("typedDisplay").innerHTML = totalSum;
            }
        } else {
            document.getElementById("typedDisplay").innerHTML = +parseFloat(totalSum).toFixed(13); // Go to 13 decimal places
        }
    }
}

clearButton = () => { // Delete last char where possible
    let popped;

    if (totalSum === undefined) { // No total
        if (secondNumber.length > 0) { // Entering second number
            popped = secondNumber.pop();
            if (secondNumber.length > 0) { // More of second number?
                document.getElementById("typedDisplay").innerHTML = secondNumber.join("");
            } else {
                document.getElementById("typedDisplay").innerHTML = firstNumber.join("");
                document.getElementById("enteredDisplay").innerHTML = "";
            }
        } else if (operand !== undefined) { // Entered operand
            operand = undefined;
            document.getElementById("typedDisplay").innerHTML = firstNumber.join("");
            document.getElementById("enteredDisplay").innerHTML = "";
        } else if (firstNumber.length > 0) { // Entering first number
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

allClearButton = () => { // Reset everything
    firstNumber = [];
    operand = undefined;
    secondNumber = [];
    totalSum = undefined;

    document.getElementById("typedDisplay").innerHTML = "";
    document.getElementById("enteredDisplay").innerHTML = "";
}