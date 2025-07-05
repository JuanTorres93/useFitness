import { useEffect } from "react";

export const useKeydown = (key, actionFn) => {
  useEffect(() => {
    // Define the callback function to handle keydown events
    const callback = (event) => {
      if (event.key.toLowerCase() === key.toLowerCase()) {
        actionFn();
      }
    };

    // Add the event listener for keydown events
    document.addEventListener("keydown", callback);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [key, actionFn]);
};
