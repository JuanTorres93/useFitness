function SearchBar({ searchTerm, onUpdateSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search exercises..."
      value={searchTerm}
      onChange={(e) => onUpdateSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;
