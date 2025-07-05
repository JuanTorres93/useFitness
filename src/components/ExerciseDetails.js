import Star from "./Star";
import { useKeydown } from "../hooks/useKeydown";

function ExerciseDetails({ exercise, onToggleFavorite, onCloseDetails }) {
  const onClickStar = (e) => {
    onToggleFavorite();
    onCloseDetails();
  };

  // Close details when pressing Escape key
  useKeydown("Escape", () => {
    onCloseDetails();
  });

  return (
    <div className="exercise-details">
      <button
        className="exercise-details__btn-back"
        onClick={onCloseDetails}
      ></button>
      <div className="exercise-details__header">
        <span>{exercise.name}</span>
        <Star isFull={exercise.isFavorite} onToggleFavorite={onClickStar} />
      </div>

      <h3>Instructions</h3>
      <Instructions instructions={exercise.instructions} />

      <h3>Target muscle{exercise.targetMuscles.length > 1 ? "s" : ""}</h3>
      <MusclesList muscles={exercise.targetMuscles} />

      <h3>Secondary muscle{exercise.secondaryMuscles.length > 1 ? "s" : ""}</h3>
      <MusclesList muscles={exercise.secondaryMuscles} />
    </div>
  );
}

function Instructions({ instructions }) {
  // Remove Step:X coming from the API
  const processedInstructions = instructions.map((instruction) => {
    // Make first letter uppercase and replace dashes with spaces
    return instruction.replace(/Step:\d+\s*/, "");
  });

  return (
    <ol className="instructions-list">
      {processedInstructions.map((instruction, index) => (
        <li key={instruction} className="instruction">
          <strong>{index + 1}</strong> - <em>{instruction}</em>
        </li>
      ))}
    </ol>
  );
}

function MusclesList({ muscles }) {
  return (
    <ul className="muscles-list">
      {muscles.map((muscle) => (
        <li key={muscle} className="muscle">
          {muscle}
        </li>
      ))}
    </ul>
  );
}

export default ExerciseDetails;
