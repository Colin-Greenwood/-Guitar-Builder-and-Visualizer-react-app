import { Link, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Home from "./Components/Home";
import ItemList from "./Components/ItemList";
import ItemDetails from "./Components/ItemDetails";

import "./App.css";

function App() {
  return (
    <div className="container">

      <Header />

      <nav className="navigation">
        <Link to="/">Home</Link>
        <Link to="/items">Guitar Parts</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/items" element={<ItemList />} />

          <Route path="/items/:id" element={<ItemDetails />} />

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
