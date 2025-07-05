import { useEffect, useRef } from "react";

import { useKeydown } from "../hooks/useKeydown";

function SearchBar({ searchTerm, onUpdateSearchTerm }) {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on mount
    inputRef.current.focus();
  }, []);

  useKeydown("Enter", () => {
    // Focus on pressing Enter key

    // Check if the input is focused
    if (document.activeElement !== inputRef.current) {
      // If not focused, focus the input
      inputRef.current.focus();

      // Clear the current search term
      onUpdateSearchTerm("");
    }
  });

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
