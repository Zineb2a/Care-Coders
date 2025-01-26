import React from "react";

const Tetris = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Tetris</h1>
      <iframe
        src="https://tetris.com/play-tetris"
        title="Tetris Game"
        style={{
          width: "80%",
          height: "500px",
          border: "none",
          borderRadius: "10px",
        }}
      ></iframe>
    </div>
  );
};

export default Tetris;
