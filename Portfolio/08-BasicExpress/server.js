const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  const bmi = (weight / (height * height)) * 10000;

  res.send(`<h2>Your BMI is ${bmi.toFixed(2)}</h2>`);
});

app.listen(3000, () => {
  console.log("Application listeting port 4000")
});