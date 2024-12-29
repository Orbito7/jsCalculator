let number1;
let number2;
let operation;
let computed;

let eqScreen = document.querySelector(".equation-screen");
let answerScreen = document.querySelector(".answer-screen");

// Event listeners for keys that are compatible
window.addEventListener("keydown", (event) => {
    if (/^[0-9]$|\./.test(event.key)) {
        numberButtonPressed(event);
    } else if (/^[*x/=\+\-]$|^(Enter)$/.test(event.key)) {
        operatorButtonPressed(event);
    } else if (/^(Backspace)$|(^Escape$)/.test(event.key)) {
        eraseButtonPressed(event);
    } else {
       return;
    }
});

// Event Listeners for the buttons
const numberButtonsContainer = document.querySelector(".number-buttons");
numberButtonsContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        numberButtonPressed(event); 
    }
});

const operatorButtonContainer = document.querySelector(".right-side-buttons");
operatorButtonContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        operatorButtonPressed(event); 
    }
});

const eraseButtonContainer = document.querySelector(".clear-buttons");
eraseButtonContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        eraseButtonPressed(event); 
    }
});

// Functions used by Event listeners
function numberButtonPressed (event) {
    let eventInfo = checkIfKeyPressOrButton(event);

    if (computed) return;
    if (!number1) {
        handleDecimalCaseFirstInput(event, eventInfo);
        eqScreen.textContent = number1;
        return;
    }

    if (!operation) {
        handleNumberGreaterThanOneDigit(event, eventInfo);
        eqScreen.textContent = number1;
        return;
    } 

    if (!number2) {
        handleDecimalCaseFirstInput(event, eventInfo);
        eqScreen.textContent += " " + number2;
        return;
    } else {
        handleNumberGreaterThanOneDigit(event, eventInfo);
        eqScreen.textContent = number1 + " " + operation + " " + number2;
    }

}

function operatorButtonPressed (event) {
    let eventInfo = checkIfKeyPressOrButton(event);

    if (!number1) return;

    if (eventInfo == "/") {
        eventInfo = "÷";
    } else if (eventInfo == "*" ) {
        eventInfo = "x";
    } else if (eventInfo == "Enter") {
        eventInfo = "=";
    }

    if (!operation) {
        operation = eventInfo;
        eqScreen.textContent += " " + operation;
        return;
    }
    if (eventInfo != "=" & !number2) return;
    if (eventInfo == "=" && !number2) return;

    if (eventInfo == "=" && number2) {
        answerScreen.textContent = operate(operation, +number1, +number2);
        computed = true;
        return;
    }

    if (computed) {
        number1 = answerScreen.textContent;
        number2 = undefined;
        operation = eventInfo;
        computed = false;
        eqScreen.textContent = answerScreen.textContent + " " + operation;
    }
} 

function eraseButtonPressed (event) {
    let eventInfo = checkIfKeyPressOrButton(event);
    
    if (eventInfo == "Backspace") {
        eventInfo = "Delete";
    } else if (eventInfo == "Escape") {
        eventInfo = "Clear";
    }   

    if (eventInfo == "Clear") {
        number1 = undefined;
        number2 = undefined;
        operation = undefined;
        computed = false;
        eqScreen.textContent = "";
        answerScreen.textContent = "";
    }
    if (eventInfo == "Delete") {
        if (!number1) return;
        if (computed) return;
        if (!operation) {
            number1 = number1.slice(0,-1);
            eqScreen.textContent = number1;
            return;
        }
        if (!number2) {
            operation = undefined;
            eqScreen.textContent = number1;
            return;
        }

        number2 = number2.slice(0,-1);
        eqScreen.textContent = number1 + " " + operation + " " + number2;
    }
}

// Helper Functions
function checkIfKeyPressOrButton (event) {
    let eventType;
    if (event.key) {
        eventType = "KEY";
    } else if (event.target.innerText) {
        eventType = "BUTTON";
    }

    if (eventType == "KEY") {
        return event.key;
    } else if (eventType == "BUTTON") {
        return event.target.innerText;
    }
}

function handleDecimalCaseFirstInput (event, eventInfo) {

    if (!number1) {
        if (eventInfo == ".") {
            number1 = "0.";
        } else {
            number1 = eventInfo;
        }
        return;
    }

    if (!number2) {
        if (eventInfo == ".") {
            number2 = "0.";
        } else {
            number2 = eventInfo;
        }
        return;
    }
    
}

function handleNumberGreaterThanOneDigit (event, eventInfo) {
    if (number1 && !operation) {
        if (number1.includes(".") && eventInfo == ".") {
            return;
        }
        number1 = number1 + eventInfo;
        if (number1.length >= 10) {
            number1 = parseFloat(number1).toExponential();
        }
        return;
    }

    if (number2) {
        if (number2.includes(".") && eventInfo == ".") {
            return;
        }
        number2 = number2 + eventInfo;
        if (number2.length >= 10) {
            number2 = parseFloat(number2).toExponential();
        }
        return;
    }
}
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