import Square from "../Square/Square";
import calculateWinner from "../../utils/calculateWinner";
import { useEffect, useState } from "react";

function Board({ xIsNext, data, onPlay }) {
  const squares = data.square;
  const [highlightIndexes, setHighlightIndexes] = useState([]);
  useEffect(() => {
    const winnerResult = calculateWinner(squares);
    if (winnerResult.line) {
      setHighlightIndexes(winnerResult.line);
    } else {
      setHighlightIndexes([]);
    }
  }, [squares]);
  function handleClick(i) {
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares).winner;
  let status;
  if (winner) {
    if (winner == "none") {
      status = "Draw";
    } else {
      status = "Winner: " + winner;
    }
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const boardSize = Math.sqrt(squares.length);
  const boardRows = [];
  for (let row = 0; row < boardSize; row++) {
    const boardCols = [];
    for (let col = 0; col < boardSize; col++) {
      const index = row * boardSize + col;
      boardCols.push(
        <Square
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          isHighlight={highlightIndexes.includes(index)}
        />
      );
    }
    boardRows.push(<div className="board-row">{boardCols}</div>);
  }
  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

export default Board;
