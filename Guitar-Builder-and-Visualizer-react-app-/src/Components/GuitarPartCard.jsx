
function GuitarPartCard({ part }) {
  return (
    <article className="part-card">
      <h3>{part.name}</h3>
      <p className="category">{part.category}</p>
      <p>{part.description}</p>
      <p className="price">${part.price}</p>
    </article>
  );
}

export default GuitarPartCard;
