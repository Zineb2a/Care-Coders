import React from "react";
import { Link } from "react-router-dom";

const games = [
  {
    name: "Tetris",
    image: "../../assets/tetris.png", 
    link: "/tetris", 
  },
  {
    name: "Minesweeper",
    image: "../../assets/technology.png",
    link: "/minesweeper",
  },
];

const Games = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Choose a Game</h1>
      <div style={styles.grid}>
        {games.map((game, index) => (
          <Link to={game.link} key={index} style={styles.card}>
            <img src={game.image} alt={game.name} style={styles.image} />
            <h2 style={styles.gameTitle}>{game.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "blue",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    cursor: "pointer",
    padding: "15px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    textDecoration: "none",
    color: "inherit",
    transition: "transform 0.3s ease",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  gameTitle: {
    fontSize: "1.2rem",
    color: "#333",
  },
};

export default Games;
