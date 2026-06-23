import "./App.css";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Create />} />
          <Route exact path="/" element={<Read />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
