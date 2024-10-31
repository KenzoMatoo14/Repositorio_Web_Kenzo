const express = require("express");
const https = require("https");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const API_KEY = "2a3ddf54a1021ece08b4c49c092ca212"; 

// Serve the index.html form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Weather Route
app.get("/weather", (req, res) => {
  const city = req.query.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

  https.get(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      const weatherData = JSON.parse(data);

      if (weatherData.cod !== 200) {
        res.send(`<h1>Error: ${weatherData.message}</h1><a href="/">Try again</a>`);
      } else {
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        res.send(`
          <h1>Weather in ${city}</h1>
          <p>Temperature: ${temperature} &deg;C</p>
          <p>Description: ${description}</p>
          <img src="${iconUrl}" alt="Weather icon" />
          <br/><a href="/">Back</a>
        `);
      }
    });
  }).on("error", (err) => {
    res.send(`<h1>Error: Unable to retrieve data.</h1><a href="/">Try again</a>`);
  });
});


// Start the server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
