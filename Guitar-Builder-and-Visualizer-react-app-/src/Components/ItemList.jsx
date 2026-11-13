
import { Link } from "react-router-dom";
import { guitarParts } from "../data/guitarData";

function ItemList() {
  return (
    <section className="builder">
      <h2>Available Guitar Parts</h2>

      <div className="parts-grid">
        {guitarParts.map((part) => (
          <article className="part-card" key={part.id}>
            <h3>{part.name}</h3>

            <p className="category">
              {part.category}
            </p>

            <p>{part.description}</p>

            <p className="price">
              ${part.price}
            </p>

            <Link
              to={`/items/${part.id}`}
              className="nav-button"
            >
              View Details
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ItemList;
