import { useEffect, useState } from "react";
import { apiURL } from "../config";

export const useFetchExercises = (searchTerm, offset = 0) => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  const limit = 15; // Default limit for pagination

  useEffect(() => {
    const controller = new AbortController();

    const fetchExercises = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          // `${apiURL}/exercises/autocomplete?search=${searchTerm}`,
          `${apiURL}/exercises?search=${searchTerm}&limit=${limit}&offset=${limit * offset}`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          throw new Error("Error fetching exercises");
        }

        const data = await res.json();

        // TODO DELETE THESE DEBUG LOGS
        console.log("data.data");
        console.log(data.data);
        const newExercises = data.data.exercises;

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

    fetchExercises();

    return () => {
      controller.abort();
    };
  }, [searchTerm, setExercises, setIsLoading, offset]);

  return {
    exercises,
    isLoading,
    totalPages,
  };
};
