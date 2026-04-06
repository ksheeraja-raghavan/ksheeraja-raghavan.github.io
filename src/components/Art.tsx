import React from "react";

const pieces = [
  {
    title: "Wave Study",
    palette: "palette-wave",
    description: "Layered movement inspired by evening tide lines.",
  },
  {
    title: "Ocean Abstract",
    palette: "palette-ocean",
    description: "Soft geometry in deep marine gradients.",
  },
  {
    title: "Blue Dreamscape",
    palette: "palette-dream",
    description: "Atmospheric tones with floating highlights.",
  },
];

const Art: React.FC = () => {
  return (
    <div className="art">
      <h1>Art</h1>
      <p>
        A selection of artworks that navigate texture, color, and quiet
        storytelling.
      </p>
      <div className="gallery">
        {pieces.map((piece) => (
          <article className="art-piece" key={piece.title}>
            <div className={`art-swatch ${piece.palette}`} aria-hidden="true" />
            <p>{piece.title}</p>
            <small>{piece.description}</small>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Art;
