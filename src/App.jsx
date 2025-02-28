import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Success from "./components/Success";
import InvalidPage from "./components/InvalidPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/invalid" element={<InvalidPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
