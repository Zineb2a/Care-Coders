import React from "react";
import Board from "../Board/Board";

import "./style.css";

class Mini extends React.Component {
  constructor(props) {
    super(props);

    this.boardElement = React.createRef();

    this.state = {
      height: 10,
      width: 10,
      mines: 15,
      gameStatus: 0, // 0: Playing, 1: Win, -1: Lose
      bannerMessage: "", // Message for the banner
      showBanner: false, // Whether to show the banner
    };
  }

  handleChange = (prop, value) => {
    this.setState({ [prop]: value });
  };

  handleChangeHeight = (event) => {
    const val = clamp(event.target.value, 5, 18);
    this.handleChange("height", val);
  };

  handleChangeWidth = (event) => {
    const val = clamp(event.target.value, 5, 18);
    this.handleChange("width", val);
  };

  handleChangeMines = (event) => {
    const cap = Math.floor((this.state.height * this.state.width) / 3);
    const val = clamp(event.target.value, 1, cap);
    this.handleChange("mines", val);
  };

  restartGame = () => {
    this.setState({
      gameStatus: 0,
      bannerMessage: "",
      showBanner: false,
    });
    this.boardElement.current.restartBoard();
  };

  // Simulate setting game status
  handleGameStatus = (status) => {
    const bannerMessage = status === 1 ? "You Win 🎉" : "You Lost !";
    this.setState({
      gameStatus: status,
      bannerMessage,
      showBanner: true,
    });

    // Hide banner after 3 seconds
    setTimeout(() => {
      this.setState({ showBanner: false });
    }, 3000);
  };

  render() {
    const { height, width, mines, gameStatus, bannerMessage, showBanner } =
      this.state;

    return (
      <div className="mini-container">
        <div className="game">
          <h1>Hospital Minesweeper</h1>
          <Board
            ref={this.boardElement}
            height={height}
            width={width}
            mines={mines}
            gameStatus={gameStatus}
            onGameStatusChange={this.handleGameStatus} // Pass handler to Board
          />
          <div className="control-buttons">
            <button onClick={this.restartGame}>Restart</button>
          </div>
        </div>
        {showBanner && (
          <div className={`banner ${gameStatus === 1 ? "win" : "lose"}`}>
            {bannerMessage}
          </div>
        )}
      </div>
    );
  }
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}

export default Mini;
