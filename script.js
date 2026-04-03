//=================================================================================
// I/O RESULT
//=================================================================================
const display = document.getElementById("display");
const answerDisplay = document.getElementById("answer-display");
const historyList = document.getElementById("history-list");

let history = [];

function appendToDisplay(input) {
  const lastChar = display.value.slice(-1);
  const operators = ["+", "-", "*", "/"];

  // Prevent double operators (but allow minus after operator for negative)
  if (operators.includes(lastChar) && operators.includes(input)) {
    display.value = display.value.slice(0, -1) + input;
    return;
  }

  // Prevent double dots
  if (input === ".") {
    const parts = display.value.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes(".")) return;
  }

  display.value += input;
}

function clearDisplay() {
  display.value = "";
  answerDisplay.innerText = "";
}

function calculate() {
  if (!display.value) return;

  try {
    const expression = display.value;
    const result = eval(expression);
    answerDisplay.innerText = "Result: " + result;

    // Add to history
    history.unshift({ expression, result }); // newest on top
    renderHistory();
  } catch (error) {
    display.value = "Error";
  }
}

//=================================================================================
// HISTORY
//=================================================================================
function renderHistory() {
  historyList.innerHTML = "";

  history.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="hist-expression">${item.expression}</span>
      <span class="hist-equals">= ${item.result}</span>
    `;
    // Click to reuse result
    li.title = "Click to use result";
    li.onclick = () => {
      display.value = String(item.result);
      answerDisplay.innerText = "";
    };
    historyList.appendChild(li);
  });
}

function clearHistory() {
  history = [];
  historyList.innerHTML = "";
}

//=================================================================================
// BACKSPACE
//=================================================================================
function backspace() {
  display.value = display.value.slice(0, -1);
  if (display.value === "") answerDisplay.innerText = "";
}

//=================================================================================
// KEYBOARD
//=================================================================================
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if ("0123456789+-*/.".includes(key)) {
    appendToDisplay(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clearDisplay();
  }
});

//=================================================================================
// NUMBER TO WORDS
//=================================================================================
function numberToWords(num) {
  if (isNaN(num)) return "Not a number";
  if (!isFinite(num)) return "Infinity";

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const scales = ["", "Thousand", "Million", "Billion", "Trillion"];

  function convertHundreds(n) {
    let res = "";
    if (n >= 100) {
      res += ones[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }
    if (n >= 20) {
      res += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    }
    if (n > 0) {
      res += ones[n] + " ";
    }
    return res;
  }

  const isNegative = num < 0;
  num = Math.abs(num);

  // Handle decimal part
  let decimalWords = "";
  if (!Number.isInteger(num)) {
    const decDigits = num.toFixed(10).split(".")[1].replace(/0+$/, ""); // trim trailing zeros
    decimalWords =
      " Point " +
      decDigits
        .split("")
        .map((d) => ones[+d] || "Zero")
        .join(" ");
    num = Math.floor(num);
  }

  if (num === 0 && !decimalWords) return "Zero";

  let result = "";
  let scaleIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      const scaleWord = scales[scaleIndex] ? scales[scaleIndex] + " " : "";
      result = convertHundreds(chunk) + scaleWord + result;
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return (isNegative ? "Negative " : "") + result.trim() + decimalWords;
}
