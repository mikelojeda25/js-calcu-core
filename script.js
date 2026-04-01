// Calculating Numbers with Eval
const display = document.getElementById("display");
const answerDisplay = document.getElementById("answer-display");

function appendToDisplay(input) {
  display.value += input;
  answer.value += input;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    answerDisplay.innerText = "Result: " + eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}

//Prevent double dots
function appendToDisplay(input) {
  if (input === ".") {
    if (display.value.includes(".")) return;
  }

  display.value += input;
}

//Prevent double operations
function appendToDisplay(input) {
  const lastChar = display.value.slice(-1);
  const operators = ["+", "-", "*", "/", "."];

  if (operators.includes(lastChar) && operators.includes(input)) {
    display.value = display.value.slice(0, -1) + input;
    return;
  }

  display.value += input;
}

// Keyboard Function
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if ("0123456789+-*/.".includes(key)) {
    appendToDisplay(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
