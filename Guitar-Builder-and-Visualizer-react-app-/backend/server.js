
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN
}));

app.use(express.json());

const PORT = process.env.PORT || 4000;

// Demo account for the assignment
const demoUser = {
  username: process.env.DEMO_USERNAME,
  passwordHash: bcrypt.hashSync(
    process.env.DEMO_PASSWORD,
    12
  ),
  role: "user"
};

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authentication required."
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid or expired token."
      });
    }

    req.user = user;
    next();
  });
}

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required."
    });
  }

  const passwordMatches = await bcrypt.compare(
    password,
    demoUser.passwordHash
  );

  if (
    username !== demoUser.username ||
    !passwordMatches
  ) {
    return res.status(401).json({
      message: "Incorrect username or password."
    });
  }

  const token = jwt.sign(
    {
      username: demoUser.username,
      role: demoUser.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Login successful!",
    token,
    user: {
      username: demoUser.username,
      role: demoUser.role
    }
  });
});

// Protected profile endpoint
app.get(
  "/api/protected/profile",
  authenticateToken,
  (req, res) => {
    res.status(200).json({
      message: "You accessed protected guitar builder data!",
      user: req.user
    });
  }
);

// Admin-only endpoint for testing 403 errors
app.get(
  "/api/admin/test",
  authenticateToken,
  (req, res) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "You do not have permission to access this page."
      });
    }

    res.status(200).json({
      message: "Welcome, administrator!"
    });
  }
);

// Basic server test
app.get("/", (req, res) => {
  res.send("Custom Guitar Builder Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
