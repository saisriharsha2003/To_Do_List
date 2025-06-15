import React from "react";
import Nav from "../components/Nav"
import "../assets/styles/home.css";

const Home = () => {
  return (
    <div>
      <div className="hero">
        <Nav />
      </div>
      <div className="bg1">
        <div className="container" style={{ background: "black", opacity: 0.9 }}>
          <p className="homep1">
            Welcome to <span className="homep">NoteNexus</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
