const express = require('express');
const cors = require('cors');
const path = require('path'); // For resolving paths
const data = require('./data');

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// API route for movies
app.get('/api/movies', (req, res) => {
  res.json(data); // Sends data in JSON format
});

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'build')));

// Fallback route for React (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).send(); // Send a 204 No Content response
});

// Start the server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
