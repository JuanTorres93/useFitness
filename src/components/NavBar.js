function NavBar({ children }) {
  return (
    <nav className="navbar">
      <img src="logo.png" alt="useFitness logo" />
      {children}
    </nav>
  );
}

export default NavBar;
