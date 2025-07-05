import { useState } from "react";
import Box from "./Box";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Exercise from "./Exercise";

import { useFetchExercises } from "../hooks/useFetchExercises";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageRequested, setPageRequested] = useState(0);
  const { exercises, isLoading, totalPages } = useFetchExercises(
    searchTerm,
    pageRequested
  );
  const lastPageRequested = totalPages - 1 <= pageRequested;

  const exercisesInstances =
    exercises.length > 0 &&
    exercises.map((exercise) => (
      <Exercise key={exercise.exerciseId} exercise={exercise} />
    ));

  const onShowMore = () => {
    setPageRequested((prevPage) => prevPage + 1);
  };

  const onUpdateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setPageRequested(0); // Reset page when search term changes
  };

  return (
    <div className="main-layout">
      <NavBar>
        <SearchBar
          searchTerm={searchTerm}
          onUpdateSearchTerm={onUpdateSearchTerm}
        />
      </NavBar>
      {/* Main */}
      <Box className="box--left">
        {isLoading ? (
          <span className="spinner"></span>
        ) : (
          <>
            {exercisesInstances}
            {exercises.length > 0 && !lastPageRequested && (
              <button className="btn" onClick={onShowMore}>
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
        <span>Item 3</span>
        <span>Item 4</span>
      </Box>
    </div>
  );
}

export default App;
