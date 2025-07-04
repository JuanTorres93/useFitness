import Box from "./Box";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="main-layout">
      <NavBar />
      {/* Main */}
      <Box className="box--left">
        <span>Item 1</span>
        <span>Item 2</span>
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
