import { useState } from "react";

import Header from "./Components/Header";
import FilterControls from "./Components/FilterControls";
import GuitarPartList from "./Components/GuitarPartList";
import Footer from "./Components/Footer";
import { guitarParts } from "./data/guitarData";
import "./App.css";

function App() {
  // State controls which category is displayed
  const [filter, setFilter] = useState("All");

  // Derived value: filter the guitar parts
  const filteredParts =
    filter === "All"
      ? guitarParts
      : guitarParts.filter((part) => part.category === filter);

  // Derived value: calculate how many parts are displayed
  const displayedCount = filteredParts.length;

  return (
    <div className="container">
      <Header />

      <main>
        <section className="hero">
          <h2>Build Your Dream Guitar</h2>
          <p>
            Explore different guitar components and customize
            your own instrument.
          </p>
        </section>

        <FilterControls
          filter={filter}
          setFilter={setFilter}
        />

        <section className="builder">
          <div className="results-header">
            <h2>Available Guitar Parts</h2>
            <p>
              Showing {displayedCount} guitar parts
            </p>
          </div>

          <GuitarPartList parts={filteredParts} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
