
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <h2>Build Your Dream Guitar</h2>

      <p>
        Welcome to the Custom Guitar Builder!
        Explore different guitar components and
        find the parts for your ideal instrument.
      </p>

      <Link to="/items" className="nav-button">
        Explore Guitar Parts
      </Link>
    </section>
  );
}

export default Home;
