import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="text-center m-5">
      {/* <button >Click here to see Star Wars...</button> */}
      <Link className="text-white home-link p-2" to="/people">
        Click here to see Star Wars...
      </Link>
    </div>
  );
};

export default Home;
