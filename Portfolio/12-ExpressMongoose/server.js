require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

var user = process.env.DB_USER;
var password = process.env.DB_PASS;

const mongoUrl = `mongodb+srv://${user}:${password}@webrepoport12.ya377.mongodb.net/?retryWrites=true&w=majority&appName=WebRepoPort12`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

const fs = require("fs");
const path = require("path");

app.use(async (req, res, next) => {
  const filePath = path.join(__dirname, "public/data/f1_2023.csv");
  
  // Check if any data is already loaded in the database to prevent duplicate loading.
  const driverCount = await Driver.countDocuments();
  if (driverCount === 0) {
    fs.readFile(filePath, "utf8", async (err, data) => {
      if (err) return next(err);

      const rows = data.trim().split("\n").slice(1); // Skip header row
      const drivers = [];
      const teams = new Set();

      rows.forEach(row => {
        const [num, code, forename, surname, dob, nationality, url, teamName, teamNationality, teamUrl] = row.split(",");
        
        const team = { name: teamName, nationality: teamNationality, url: teamUrl };
        teams.add(JSON.stringify(team));

        drivers.push({
          num: Number(num),
          code,
          forename,
          surname,
          dob: new Date(dob),
          nationality,
          url,
          team
        });
      });

      // Insert teams and drivers
      const teamDocs = Array.from(teams).map(team => JSON.parse(team));
      await Team.insertMany(teamDocs);
      await Driver.insertMany(drivers);

      console.log("Database populated with drivers and teams from CSV.");
      next();
    });
  } else {
    next();
  }
});

app.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { forename, surname, dob, nationality, teamName } = req.body;

  try {
    await Driver.findByIdAndUpdate(id, { forename, surname, dob, nationality, team: { name: teamName } });
    res.status(200).send("Update successful.");
  } catch (error) {
    res.status(500).send("Error updating driver/team.");
  }
});



app.get("/", async (req, res) => {
  try {
    const teams = await Team.find().sort({ name: 1 });
    const drivers = await Driver.find().sort({ num: 1 });
    res.render("index", { countries, teams, drivers });
  } catch (error) {
    res.status(500).send("Error loading data.");
  }
});


app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
