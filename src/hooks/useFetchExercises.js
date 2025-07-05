import { useEffect, useState } from "react";
import { apiURL } from "../config";

export const useFetchExercises = (searchTerm, offset = 0) => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  // TODO: Error state to use message to user

  const limit = 15; // Default limit for pagination

  useEffect(() => {
    const controller = new AbortController();

    const fetchExercises = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${apiURL}/exercises?search=${searchTerm}&limit=${limit}&offset=${limit * offset}`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          throw new Error("Error fetching exercises");
        }

        const data = await res.json();

        const favExercisesIds = JSON.parse(
          localStorage.getItem("favExercises") || "[]"
        ).map((exercise) => exercise.exerciseId);

        const newExercises = data.data.exercises.map((exercise) => ({
          ...exercise,
          isFavorite: favExercisesIds.includes(exercise.exerciseId),
        }));

        setTotalPages(data.data.totalPages);
        setExercises((curExercises) =>
          offset === 0 ? newExercises : [...curExercises, ...newExercises]
        );
        setIsLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log("error fetching exercises");
          console.log(error);
          setIsLoading(false);
        }
      } finally {
        // NOTE: do not set isLoading to false here,
        // it will be updated even with AbortError
      }
    };

    searchTerm.trim() !== "" ? fetchExercises() : setExercises([]);

    return () => {
      controller.abort();
    };
  }, [searchTerm, setExercises, setIsLoading, offset]);

  return {
    exercises,
    isLoading,
    totalPages,
    setExercises,
  };
};
