import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Details from "./pages/Details";
import Create from "./pages/Create";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/details/:id" element={<Details />} />
      <Route exact path="/create" element={<Create />} />
    </Routes>
  );
}

export default App;
