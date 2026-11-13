
import { useState } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Home from "./Components/Home";
import ItemList from "./Components/ItemList";
import ItemDetails from "./Components/ItemDetails";

import "./App.css";

// Protect pages that require login
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const usernameInput = formData.get("username");
    const passwordInput = formData.get("password");

    setLoading(true);
    setLoginError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", usernameInput);

      setUsername(usernameInput);
      setIsLoggedIn(true);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setUsername("");
  }

  return (
    <div className="container">
      <Header />

      <nav className="navigation">
        <Link to="/">Home</Link>

        {isLoggedIn && <Link to="/items">Guitar Parts</Link>}

        {isLoggedIn ? (
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <main>
        {isLoggedIn && (
          <p className="auth-status">
            Logged in as: <strong>{username}</strong>
          </p>
        )}

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/items" replace />
              ) : (
                <section className="part-card">
                  <h2>Guitar Builder Login</h2>
                  <p>Log in to access your guitar parts.</p>

                  <form onSubmit={handleLogin}>
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />

                    <button type="submit" disabled={loading}>
                      {loading ? "Logging in..." : "Log In"}
                    </button>
                  </form>

                  {loginError && (
                    <p className="error-message">{loginError}</p>
                  )}
                </section>
              )
            }
          />

          <Route
            path="/items"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ItemList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/items/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ItemDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <section className="part-card">
                <h2>Page Not Found</h2>
                <p>The page you requested does not exist.</p>
                <Link to="/" className="nav-button">
                  Return Home
                </Link>
              </section>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
