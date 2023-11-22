import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Edit from "./Pages/Edit";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/edit/:id" element={<Edit/>}></Route>
        </Routes>
    </>
  );
}

export default App;
