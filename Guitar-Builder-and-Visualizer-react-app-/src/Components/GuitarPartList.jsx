
import GuitarPartCard from "./GuitarPartCard";

function GuitarPartList({ parts }) {
  return (
    <div className="parts-grid">
      {parts.map((part) => (
        <GuitarPartCard
          key={part.id}
          part={part}
        />
      ))}
    </div>
  );
}

export default GuitarPartList;
