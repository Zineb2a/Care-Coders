import React from "react";
import { Link } from "react-router-dom";
import "./games.css";

const Games = () => {
  return (
    <div className="games-container">
      <h1 className="games-title">Choose a Game</h1>
      <div className="games-grid">
        {/* Tetris Game Card */}
        <Link to="/tetris" className="game-card">
          <img
            src="https://i.ibb.co/KwySkQg/tetris.png" /* Corrected hosted image URL */
            alt="Tetris"
            className="game-image"
          />
          <h2 className="game-title">Tetris</h2>
        </Link>

        {/* Minesweeper Game Card */}
        <Link to="/minesweeper" className="game-card">
          <img
            src="https://i.ibb.co/2KpfvJ2/minesweeper.png" /* Corrected hosted image URL */
            alt="Minesweeper"
            className="game-image"
          />
          <h2 className="game-title">Minesweeper</h2>
        </Link>
      </div>
    </div>
  );
};

export default Games;
