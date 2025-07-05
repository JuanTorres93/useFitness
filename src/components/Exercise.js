import Star from "./Star";

function Exercise({ exercise, onHandleToggleFavorite }) {
  // Make first letter uppercase and replace dashes with spaces
  const name = exercise?.name
    .replace(/-/g, " ")
    .toLowerCase()
    .replace(/\b\w/, (char) => char.toUpperCase());

  return (
    <div className="exercise">
      <span className="exercise__name">{name}</span>
      <Star
        isFull={exercise?.isFavorite || false}
        onHandleToggleFavorite={onHandleToggleFavorite}
      />
    </div>
  );
}

export default Exercise;
