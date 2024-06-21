import logo from "./logo.svg";
import "./App.css";
import { Counter } from "./components/counter";
import RepoCont from "./Containers/repoCont";
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>home</div>} />

          <Route path="/counter" element={<Counter />} />

          <Route
            path="/repositories/:owner/:repository/commit/:commitSHA"
            element={<RepoCont />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
