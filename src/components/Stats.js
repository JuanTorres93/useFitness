function Stats({ exercises }) {
  return (
    <div className="stats">
      <span className="stats__number">
        {exercises?.length > 0 && exercises.length}
      </span>{" "}
      Results
    </div>
  );
}

export default Stats;
