import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./component/navbar/navbar";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import People from "./component/people/people";
import Home from "./component/home/home";

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <LoadingBar height={4} color="#f11946" progress={progress} />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/people" element={<People />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
