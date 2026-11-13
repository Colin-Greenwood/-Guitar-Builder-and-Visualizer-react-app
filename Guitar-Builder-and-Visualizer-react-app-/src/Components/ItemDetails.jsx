
import { Link, useParams } from "react-router-dom";
import { guitarParts } from "../data/guitarData";

function ItemDetails() {
  const { id } = useParams();

  // Find the guitar part matching the URL ID
  const part = guitarParts.find(
    (item) => String(item.id) === id
  );

  // Handle invalid IDs
  if (!part) {
    return (
      <section className="part-card">
        <h2>Guitar Part Not Found</h2>

        <p>
          Sorry, the guitar part you requested
          does not exist.
        </p>

        <Link to="/items" className="nav-button">
          Back to Guitar Parts
        </Link>
      </section>
    );
  }

  return (
    <section className="part-card">
      <h2>{part.name}</h2>

      <p className="category">
        Category: {part.category}
      </p>

      <p>{part.description}</p>

      <p className="price">
        Price: ${part.price}
      </p>

      <Link to="/items" className="nav-button">
        Back to All Parts
      </Link>
    </section>
  );
}

export default ItemDetails;
