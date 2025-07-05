import { useEffect, useRef } from "react";

function SearchBar({ searchTerm, onUpdateSearchTerm }) {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on mount
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    // Focus when pressing Enter key
    const callback = (event) => {
      if (event.key.toLowerCase() === "enter") {
        // Check if the input is focused
        if (document.activeElement !== inputRef.current) {
          // If not focused, focus the input
          inputRef.current.focus();

          // Clear the current search term
          onUpdateSearchTerm("");
        }
      }
    };

    // Press entrer to focus search input
    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onUpdateSearchTerm]);

  return (
    <input
      type="text"
      placeholder="Search exercises..."
      value={searchTerm}
      onChange={(e) => onUpdateSearchTerm(e.target.value)}
      ref={inputRef}
    />
  );
}

export default SearchBar;
