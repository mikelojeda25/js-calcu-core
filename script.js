// Calculating Numbers with Eval
const display = document.getElementById("display");

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    display.value = eval(display.value);
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
  // 1. Huwag payagan ang double operators (e.g., "++" o "**")
  const lastChar = display.value.slice(-1);
  const operators = ["+", "-", "*", "/"];

  if (operators.includes(lastChar) && operators.includes(input)) {
    // Palitan ang huling operator ng bago (kung nagbago ang isip ng user)
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
