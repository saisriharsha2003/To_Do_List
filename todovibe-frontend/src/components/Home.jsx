import React from "react";
import Nav from "../components/Nav";
import "../assets/styles/home.css";

const Home = () => {
  return (
    <>
      <Nav  style={{"padding-bottom": "50px"}}/>
      <div className="bg1">
        <div className="container">
          <p className="homep1">
            Welcome to <span className="homep">TodoVibe</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
