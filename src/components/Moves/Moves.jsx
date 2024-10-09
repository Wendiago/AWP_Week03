import React from "react";

export default function Moves({
  history,
  moveOption,
  currentMove,
  setCurrentMove,
}) {
  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  function getMoveLocation(index) {
    const boardSize = Math.sqrt(history[0].square.length);
    //console.log(boardSize);
    const row = Math.ceil(index / boardSize);
    const col = (index % boardSize) + 1;
    return `(${row}, ${col})`;
  }

  const moveIndices =
    moveOption === "ascending"
      ? [...Array(history.length).keys()]
      : [...Array(history.length).keys()].reverse();

  const moves = moveIndices.map((move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";

    const square = history[move];
    return (
      <li key={move} className="move-container">
        {move === currentMove ? (
          <div className="move-container">
            <strong>You are at move # {move}</strong>
            {square.move != null && (
              <div className="move-location">
                {getMoveLocation(square.move)}
              </div>
            )}
          </div>
        ) : (
          <div className="move-container">
            <button className="move-btn" onClick={() => jumpTo(move)}>
              {description}
            </button>
            {square.move != null && (
              <div className="move-location">
                {getMoveLocation(square.move)}
              </div>
            )}
          </div>
        )}
      </li>
    );
  });

  return moves;
}
