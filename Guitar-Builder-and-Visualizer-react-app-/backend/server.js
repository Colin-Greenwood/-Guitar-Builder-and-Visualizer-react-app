
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Guitar Builder Backend is running!" });
});

// Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "student" && password === "password123") {
    return res.json({
      success: true,
      message: "Login successful!",
      token: "guitar-builder-demo-token"
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid username or password"
  });
});

// Protected route
app.get("/api/protected", (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== "Bearer guitar-builder-demo-token") {
    return res.status(401).json({
      message: "Unauthorized. Please log in."
    });
  }

  res.json({
    message: "Welcome! You accessed the protected guitar builder data."
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
