const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Array to store names and tasks
let names = [];
let tasks = []; // New array for tasks

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/html');

// Root path - render index.ejs
app.get('/', (req, res) => {
    res.render('index', { names: names, tasks: tasks, error: null });
});

// /greet endpoint - handle form submission and add name to the list
app.get('/greet', (req, res) => {
    const { name } = req.query;
    if (name) {
        names.push(name);
        console.log(`Name registered: ${name}`);
    }
    res.render('index', { names: names, tasks: tasks, error: null });
});

// /greet PUT endpoint to add a name and return names in JSON
app.put('/greet/:name', (req, res) => {
    const { name } = req.params;
    names.push(name);
    res.json(names);
});

// Wazzup page - greet user by name with error handling
app.get('/wazzup/:index', (req, res, next) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < names.length) {
        const person = names[index];
        res.send(`<h1>Wazzup, ${person}!</h1><a href='/'>Back to index</a>`);
    } else {
        const error = "Index out of range!";
        res.render('index', { names: names, tasks: tasks, error: error });
    }
});

// /task endpoint to handle task submission
app.post('/task', (req, res) => {
    const { task } = req.body;
    if (task) {
        tasks.push(task);
        console.log(`Task added: ${task}`);
    }
    res.redirect('/'); // Redirect to the same page
});

// /task/delete/:index to handle task deletion
app.get('/task/delete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        console.log(`Task deleted at index: ${index}`);
    }
    res.redirect('/'); // Redirect to the same page
});

// /task/move-up/:index to handle moving tasks up
app.get('/task/move-up/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index > 0) {
        const task = tasks[index];
        tasks.splice(index, 1); // Remove the task from current position
        tasks.splice(index - 1, 0, task); // Insert it one position up
        console.log(`Task moved up from index: ${index}`);
    }
    res.redirect('/'); // Redirect to the same page
});

// /task/move-down/:index to handle moving tasks down
app.get('/task/move-down/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length - 1) {
        const task = tasks[index];
        tasks.splice(index, 1); // Remove the task from current position
        tasks.splice(index + 1, 0, task); // Insert it one position down
        console.log(`Task moved down from index: ${index}`);
    }
    res.redirect('/'); // Redirect to the same page
});

// GET /task endpoint to return all tasks as JSON (accessible via Postman)
app.get('/task', (req, res) => {
    res.json(tasks);
});

// Set up the server to listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
