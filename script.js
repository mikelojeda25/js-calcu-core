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
