/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
// This array will keep memory of the previous fibonacci numbers

document.getElementById("btn").addEventListener("click", function () {
  const result = fibonacci();
  document.getElementById("fibonacciLbl").textContent = `Fibonacci value: ${result}`;
});

var memo = {};
function fibonacci() {
  "use strict";
  var n = parseInt(document.getElementById("num").value);
  if (isNaN(n) || n < 0) {
    alert("Please enter a non-negative integer.");
    return;
  }
  var val = f(n);
  return val;
}

function f(n) {
  var value;
  // Check if the memory array already contains the requested number
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
      if (n === 0) {
        value = 0;
    } else if (n === 1) {
        value = 1;
    } else {
        value = f(n - 1) + f(n - 2);
    }

    memo[n] = value;
  }

  return value;
}