const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

const users = [
  {
    id: 1,
    username: "test",
    password: "$2b$12$IOoCj824JrzZgj0brYXpFeTrvmhNEZDpOO9M3UZi.tZMCX3jHDPYK", // "test"
    role: "USER",
    name: "Mitko",
  },
];

const userFavoriteHouses = {
  1: [1, 2],
};
const userFavoriteCharacters = {
  1: [1, 2],
};
const userFavoriteBooks = {
  1: [1, 2],
};

app.use(cors());
app.use(bodyParser.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
};

// Login route to authenticate user and issue JWT token
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).send("Invalid username or password");
  }

  // Compare password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send("Invalid username or password");
  }

  // Create JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

app.get("/profile", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.sendStatus(404);

  res.json({
    id: user.id,
    name: user.name,
    role: user.role,
  });
});

app.post("/books/favorites", verifyToken, (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id;

  if (!bookId) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  const userFavorites = userFavoriteBooks[userId];

  const bookIndex = userFavorites.indexOf(bookId);

  if (bookIndex === -1) {
    userFavorites.push(bookId);
    return res.status(200).json({ message: "Book added to favorites", favorites: userFavorites });
  } else {
    userFavorites.splice(bookIndex, 1);
    return res.status(200).json({ message: "Book removed from favorites", favorites: userFavorites });
  }
});

app.get("/profile", verifyToken, (req, res) => {
  const userId = req.params.id;
  res.send(userFavoriteBooks[userId] ?? []);
});

app.get("/users/:id/favorites/books", verifyToken, (req, res) => {
  const userId = req.params.id;
  res.send(userFavoriteBooks[userId] ?? []);
});

app.get("/users/:id/favorites/houses", verifyToken, (req, res) => {
  const userId = req.params.id;
  res.send(userFavoriteHouses[userId] ?? []);
});

app.get("/users/:id/favorites/characters", verifyToken, (req, res) => {
  const userId = req.params.id;
  res.send(userFavoriteCharacters[userId] ?? []);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
