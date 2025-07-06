import Exercise from "./Exercise";
function ExerciseList({
  exercises,
  handleToggleFavorite,
  handleSelectExercise,
}) {
  return (
    exercises.length > 0 &&
    exercises.map((exercise) => (
      <Exercise
        key={exercise.exerciseId}
        exercise={exercise}
        onToggleFavorite={() => {
          handleToggleFavorite(exercise);
        }}
        onSelectExercise={() => {
          handleSelectExercise(exercise);
        }}
      />
    ))
  );
}

export default ExerciseList;
