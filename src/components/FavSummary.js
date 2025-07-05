import Star from "./Star";

function FavSummary({ favExercises }) {
  const targetMuscles = favExercises
    .map((exercise) => exercise.targetMuscles)
    .flat();

  const musclesCount = targetMuscles.reduce((acc, muscle) => {
    acc[muscle] ? (acc[muscle] = acc[muscle] + 1) : (acc[muscle] = 1);
    return acc;
  }, {});

  const mostTargetedMuscle = Object.keys(musclesCount).reduce(
    (acc, muscle) =>
      musclesCount[muscle] > acc.count
        ? {
            muscle: muscle,
            count: musclesCount[muscle],
          }
        : acc,
    {
      muscle: "",
      count: 0,
    }
  );

  return (
    <div className="fav-summary">
      <div className="fav-summary__box">
        {favExercises?.length} <Star isFull={true} />
      </div>

      {mostTargetedMuscle.muscle && (
        <div className="fav-summary__box">
          🔝 💪: {mostTargetedMuscle.muscle}
        </div>
      )}
    </div>
  );
}

export default FavSummary;
