import { useState } from "react";
import Box from "./Box";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Exercise from "./Exercise";
import ExerciseList from "./ExerciseList";
import Stats from "./Stats";
import FavSummary from "./FavSummary";
import ExerciseDetails from "./ExerciseDetails";
import Error from "./Error";

import { useFetchExercises } from "../hooks/useFetchExercises";

function App() {
  // State definition
  const [searchTerm, setSearchTerm] = useState("");
  const [pageRequested, setPageRequested] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const { exercises, isLoading, error, totalPages, setExercises } =
    useFetchExercises(searchTerm, pageRequested);
  const [favExercises, setFavExercises] = useState(() => {
    const storedFavExercises = localStorage.getItem("favExercises");
    return storedFavExercises ? JSON.parse(storedFavExercises) : [];
  });

  const hasRequestedLastPage = totalPages - 1 <= pageRequested;

  // Event handlers
  function handleShowMore() {
    setPageRequested((prevPage) => prevPage + 1);
  }

  function handleUpdateSearchTerm(newSearchTerm) {
    setSearchTerm(newSearchTerm);
    setPageRequested(0); // Reset page when search term changes
  }

  function handleSelectExercise(exercise) {
    // If the exercise is already selected, deselect it
    if (selectedExercise?.exerciseId === exercise.exerciseId) {
      setSelectedExercise(null);
    } else {
      // Otherwise, select the new exercise
      setSelectedExercise(exercise);
    }
  }

  function handleDeselectExercise() {
    setSelectedExercise(null);
  }

  function handleToggleFavorite(exercise) {
    // Compute final exercise yo reuse in both lists
    const updatedExercise = {
      ...exercise,
      isFavorite: !exercise.isFavorite,
    };

    // Set exercises state
    setExercises((curExercises) =>
      curExercises.map((ex) =>
        ex.exerciseId === exercise.exerciseId ? updatedExercise : ex
      )
    );

    // Set favorite exercises state
    setFavExercises((curFavExercises) => {
      const isAlreadyFavorite = curFavExercises.some(
        (favEx) => favEx.exerciseId === exercise.exerciseId
      );

      let futureFavExercises = [];

      // Remove it if already favorite
      if (isAlreadyFavorite) {
        futureFavExercises = curFavExercises.filter(
          (favEx) => favEx.exerciseId !== exercise.exerciseId
        );
      }
      // Add it if not
      else {
        futureFavExercises = [...curFavExercises, updatedExercise];
      }

      // Update localStorage
      localStorage.setItem("favExercises", JSON.stringify(futureFavExercises));

      // Actually update state
      return futureFavExercises;
    });
  }

  return (
    <div className="main-layout">
      <NavBar>
        <SearchBar
          searchTerm={searchTerm}
          onUpdateSearchTerm={handleUpdateSearchTerm}
        />
        {exercises.length > 0 && <Stats exercises={exercises} />}
      </NavBar>

      <Box className="box--left">
        {error && <Error error={error} />}
        {isLoading && !error && <span className="spinner"></span>}
        {!isLoading && !error && (
          <>
            {exercises.length > 0 ? (
              <ExerciseList
                exercises={exercises}
                handleToggleFavorite={handleToggleFavorite}
                handleSelectExercise={handleSelectExercise}
              />
            ) : (
              <span className="no-content-text">No exercises found</span>
            )}
            {exercises.length > 0 && !hasRequestedLastPage && (
              <button className="btn" onClick={handleShowMore}>
                Show more
              </button>
            )}
          </>
        )}
      </Box>

      <Box className="box--right">
        {selectedExercise ? (
          <ExerciseDetails
            exercise={selectedExercise}
            onToggleFavorite={() => handleToggleFavorite(selectedExercise)}
            onCloseDetails={handleDeselectExercise}
          />
        ) : (
          <>
            <FavSummary favExercises={favExercises} />
            {favExercises.length > 0 ? (
              <ExerciseList
                exercises={favExercises}
                handleToggleFavorite={handleToggleFavorite}
                handleSelectExercise={handleSelectExercise}
              />
            ) : (
              <span className="no-content-text">
                You don't have any favorite exercises yet
              </span>
            )}
          </>
        )}
      </Box>
    </div>
  );
}

export default App;
