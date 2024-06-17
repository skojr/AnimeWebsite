import { useState } from "react";

import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./pages/Home/HomePage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello</h1>
      <Navbar></Navbar>
      <HomePage></HomePage>
    </>
  );
}

export default App;
