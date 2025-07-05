import { useState } from "react";
import Box from "./Box";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Exercise from "./Exercise";
import Stats from "./Stats";
import FavSummary from "./FavSummary";

import { useFetchExercises } from "../hooks/useFetchExercises";

function App() {
  // State definition
  const [searchTerm, setSearchTerm] = useState("");
  const [pageRequested, setPageRequested] = useState(0);
  const { exercises, isLoading, totalPages, setExercises } = useFetchExercises(
    searchTerm,
    pageRequested
  );
  const [favExercises, setFavExercises] = useState(() => {
    const storedFavExercises = localStorage.getItem("favExercises");
    return storedFavExercises ? JSON.parse(storedFavExercises) : [];
  });

  const hasRequestedLastPage = totalPages - 1 <= pageRequested;

  // Exercise instances computed here to get cleaner JSX below
  const exercisesInstances =
    exercises.length > 0 &&
    exercises.map((exercise) => (
      <Exercise
        key={exercise.exerciseId}
        exercise={exercise}
        onHandleToggleFavorite={() => {
          handleToggleFavorite(exercise);
        }}
      />
    ));

  const favExercisesInstances =
    favExercises.length > 0 &&
    favExercises.map((exercise) => (
      <Exercise
        key={exercise.exerciseId}
        exercise={exercise}
        onHandleToggleFavorite={() => {
          handleToggleFavorite(exercise);
        }}
      />
    ));

  // Event handlers
  const handleShowMore = () => {
    setPageRequested((prevPage) => prevPage + 1);
  };

  const handleUpdateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setPageRequested(0); // Reset page when search term changes
  };

  // NOTE: Defined as "function" to be able to use it above
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
        {isLoading ? (
          <span className="spinner"></span>
        ) : (
          <>
            {exercises.length > 0 ? (
              exercisesInstances
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
      {/* ==== Exercise Item */}
      {/* == Box Content */}
      {/* ==== Stats */}
      {/* ==== (OR) Exercise Details */}
      {/* ==== (OR) Fav Exercises List */}
      {/* ====== Exercise Item */}
      <Box className="box--right">
        <FavSummary favExercises={favExercises} />
        {favExercises.length > 0 ? (
          favExercisesInstances
        ) : (
          <span className="no-content-text">
            You don't have any favorite exercises yet
          </span>
        )}
      </Box>
    </div>
  );
}

export default App;
