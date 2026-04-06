import React from "react";

const About: React.FC = () => {
  return (
    <div className="about">
      <h1>About Me</h1>
      <p>
        Hi, I’m Ksheeraja. Lorem Ipsum dolor sit amet, consectetur adipiscing
        elit. Donec vel sapien
      </p>
      <div className="about-grid">
        <div>
          <h2>My approach</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            possimus sint eaque, quas dignissimos delectus iusto asperiores
            pariatur et dolor nulla mollitia inventore magnam necessitatibus. Ex
            consequuntur magni nobis aliquid!
          </p>
        </div>
        <div>
          <h2>My intent</h2>
          <p>Lorem Ipsum</p>
        </div>
      </div>
    </div>
  );
};

export default About;
