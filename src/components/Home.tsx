import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="hero-banner">
        <div className="hero-copy">
          <p className="eyebrow">Ksheeraja Raghavan</p>

          <h1>Art, Music, Research, and Blogs.</h1>

          <p className="hero-text">Lorem Ipsum</p>

          <div className="hero-actions">
            <Link to="/about" className="hero-button">
              Learn more
            </Link>

            <Link to="/blog" className="hero-link">
              Read the blog
            </Link>
          </div>
        </div>

        <div className="hero-aside">
          <div className="hero-panel">
            <img
              src="/portrait.svg"
              alt="Illustrated portrait"
              className="hero-portrait"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
