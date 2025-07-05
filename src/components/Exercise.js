import Star from "./Star";

function Exercise({ exercise, onToggleFavorite, onSelectExercise }) {
  // Make first letter uppercase and replace dashes with spaces
  const name = exercise?.name
    .replace(/-/g, " ")
    .toLowerCase()
    .replace(/\b\w/, (char) => char.toUpperCase());

  return (
    <div onClick={onSelectExercise} className="exercise">
      <span className="exercise__name">{name}</span>
      <Star
        isFull={exercise?.isFavorite || false}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}

export default Exercise;
