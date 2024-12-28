let number1;
let number2;
let operation;
let computed;

let eqScreen = document.querySelector(".equation-screen");
let answerScreen = document.querySelector(".answer-screen");

const numberButtonsContainer = document.querySelector(".number-buttons");
numberButtonsContainer.addEventListener("click", (event)=> {
    if (!isButton(event)) return;
    if (!number1) {
        if (event.target.innerText == ".") {
            number1 = "0.";
        } else {
            number1 = event.target.innerText;
        }
        eqScreen.textContent = number1;
        return;
    }

    if (!operation) {
        if (number1.includes(".") && event.target.innerText == ".") {
            return;
        }
        number1 = number1 + event.target.innerText;
        eqScreen.textContent = number1;
        return;
    } 
    
    if (!number2) {
        if (event.target.innerText == ".") {
            number2 = "0.";
        } else {
            number2 = event.target.innerText;
        }
        eqScreen.textContent += " " + number2;
        return;
    } else {
        if (number2.includes(".") && event.target.innerText == ".") {
            return;
        }
        number2 = number2 + event.target.innerText;
        eqScreen.textContent = number1 + " " + operation + " " + number2;
    }

});

const operatorButtonContainer = document.querySelector(".right-side-buttons");
operatorButtonContainer.addEventListener("click", (event) => {
    if (!isButton(event)) return;
    if (!number1) return;
    if (!operation) {
        operation = event.target.innerText;
        eqScreen.textContent += " " + operation;
        return;
    }
    if (event.target.innerText != "=" & !number2) return;
    if (event.target.innerText == "=" && !number2) return;

    if (event.target.innerText == "=" && number2) {
        answerScreen.textContent = operate(operation, +number1, +number2);
        computed = true;
        return;
    }

    if (computed) {
        number1 = answerScreen.textContent;
        number2 = undefined;
        operation = event.target.innerText;
        computed = false;
        eqScreen.textContent = answerScreen.textContent + operation;
    }

});

function isButton(event) {
    return event.target.tagName === "BUTTON";
}
function operate(operator, num1, num2) {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "x") {
        return multiply(num1, num2);
    } else if (operator === "÷") {
        return divide(num1, num2);
    }
} 

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 == 0) {
        alert("Cannot divide by 0");
        return num1;
    } else {
        return num1 / num2;
    }
}