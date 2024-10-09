import { useState } from "react";
import Board from "./components/Board/Board";
import Moves from "./components/Moves/Moves";

export default function Game() {
  const [history, setHistory] = useState([
    { square: Array(9).fill(null), move: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [moveOption, setMoveOption] = useState("ascending");

  function handlePlay(nextSquares, moveLocation) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { square: nextSquares, move: moveLocation },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const handleMoveFilter = (e) => {
    //console.log(e.target.value);
    setMoveOption(e.target.value);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} data={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <form className="toggle-button">
          <div>
            <input
              type="radio"
              name="sort-btn"
              id="ascending"
              value="ascending"
              checked={moveOption == "ascending"}
              onChange={(e) => handleMoveFilter(e)}
            ></input>
            <label htmlFor="ascending">Ascending</label>
          </div>

          <div>
            <input
              type="radio"
              name="sort-btn"
              id="descending"
              value="descending"
              checked={moveOption == "descending"}
              onChange={(e) => handleMoveFilter(e)}
            ></input>
            <label htmlFor="descending">Descending</label>
          </div>
        </form>

        <ul className="move-list">
          <Moves
            history={history}
            moveOption={moveOption}
            currentMove={currentMove}
            setCurrentMove={setCurrentMove}
          ></Moves>
        </ul>
      </div>
    </div>
  );
}
