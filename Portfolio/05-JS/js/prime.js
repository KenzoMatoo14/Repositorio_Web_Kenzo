function displayPrimeFactors() {
  const num = parseInt(document.getElementById("num").value);
  if (isNaN(num) || num <= 1) {
      document.getElementById("pf").innerText = "Please enter a valid number greater than 1.";
      return;
  }
  const primeFactors = getPrimeFactors(num);
  document.getElementById("pf").innerText = `The prime factors of ${num} are: ${primeFactors.join(", ")}`;
}

var getPrimeFactors = function (n) {
  "use strict";

  function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  let sequence = [];

  for (let i = 2; i <= n; i++) {
    if (n % i === 0 && isPrime(i)) {
      sequence.push(i);
    }
  }

  return sequence;
};

console.log(getPrimeFactors(30030)); // Debería imprimir los factores primos [2, 3, 5, 7, 11, 13]
