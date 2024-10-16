var sieve = function (n) {
  "use strict";

  var array = new Array(n + 1).fill(true);
  var primes = [];
  var i, j;

  array[0] = array[1] = false;

  for (i = 2; i <= Math.sqrt(n); i++) {
      if (array[i]) {
          for (j = i * i; j <= n; j += i) {
              array[j] = false; 
          }
      }
  }

  for (i = 2; i <= n; i++) {
      if (array[i]) {
          primes.push(i);
      }
  }

  return primes;
};


document.getElementById("btn").addEventListener("click", function () {
  var inputNumber = parseInt(document.getElementById("num").value);
  if (isNaN(inputNumber) || inputNumber < 2) {
      document.getElementById("primes").textContent = "Please enter a number greater than 1.";
  } else {
      var primeNumbers = sieve(inputNumber);
      document.getElementById("primes").textContent = primeNumbers.join(", ");
  }
});
