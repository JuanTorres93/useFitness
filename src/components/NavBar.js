import SearchBar from "./SearchBar";

function NavBar() {
  return (
    <nav className="navbar">
      <img src="logo.png" alt="useFitness logo" />
      <SearchBar />
    </nav>
  );
}

export default NavBar;
