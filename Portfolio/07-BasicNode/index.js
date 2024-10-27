import sw from 'star-wars-quotes';

console.log("Hello, world!");

console.log(sw());

(async () => {
  const superheroes = await import('superheroes');
  const supervillains = await import('supervillains');

  const hero = superheroes.randomSuperhero();
  const villain = supervillains.randomSupervillain();

  console.log(`${hero} will battle ${villain}!`);
})();

import fs from 'fs/promises';

async function readSecretMessage() {
   try {
      const data = await fs.readFile('./data/input.txt', 'utf8');
      console.log("Secret message:", data);
   } catch (err) {
      console.error("Error reading file:", err);
   }
}

readSecretMessage();


