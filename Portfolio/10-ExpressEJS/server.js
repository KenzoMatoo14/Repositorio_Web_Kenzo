const express = require("express");
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

let posts = []; // Array to hold blog posts
let loggedUserName; // Variable to hold the logged-in user's name

// Serve the index.html file on the root path
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

// Handle GET request at /login endpoint
app.get("/login", (req, res) => {
  loggedUserName = req.query.name || "Guest";
  res.redirect("/home"); // Redirect to home after login
});

// Handle POST request at /login endpoint
app.post("/login", (req, res) => {
  loggedUserName = req.body.name || "Guest";
  res.redirect("/home"); // Redirect to home after login
});

// Serve home.ejs template
app.get("/home", (req, res) => {
  if (!loggedUserName) {
    return res.redirect("/"); // Redirect to index if name is not available
  }
  res.render("home", { name: loggedUserName, posts: posts });
});

// Handle new post submission
app.post("/new-post", (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    title: title,
    content: content
  };
  posts.push(newPost); // Add new post to the posts array
  res.redirect("/home"); // Redirect back to home after adding the post
});

// Serve post.ejs template for editing or deleting posts
app.get("/post/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < posts.length) {
    res.render("post", { post: posts[index], index: index });
  } else {
    res.redirect("/home"); // Redirect if index is invalid
  }
});

// Handle post deletion
app.post("/delete-post/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < posts.length) {
    posts.splice(index, 1); // Remove post from the array
  }
  res.redirect("/home"); // Redirect back to home
});

// Start the server and listen on port 3000
app.listen(3000, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log("Listening on port 3000");
  }
});
