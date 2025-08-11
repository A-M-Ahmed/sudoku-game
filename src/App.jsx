import React, { useState } from "react";
import "./App.css";
import SortChallenge from "./SortChallenge";

// Starter puzzle (0 = empty)
const starterPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],

  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],

  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

// (Optional) Full solution if you want to use later
const solution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

function App() {
  // Board: convert 0s to "" so inputs start empty
  const [board, setBoard] = useState(
    starterPuzzle.map((row) => row.map((v) => (v === 0 ? "" : String(v))))
  );
  const LOCK_ROW = 0;
  const LOCK_COL = 2;
  const [sortType, setSortType] = useState("bubble");
  const [sortCompleted, setSortCompleted] = useState(false);

  const isGiven = (r, c) => starterPuzzle[r][c] !== 0;

  // Validate row + column (you can add 3x3 later if you want)
  const isValidMove = (row, col, value) => {
    // row
    for (let c = 0; c < 9; c++) {
      if (c !== col && board[row][c] === value) return false;
    }
    // column
    for (let r = 0; r < 9; r++) {
      if (r !== row && board[r][col] === value) return false;
    }
    return true;
  };

  const handleChange = (row, col, value) => {
    // Only allow digits 1–9 or empty
    if (!/^[1-9]?$/.test(value)) return;

    if (value !== "" && !isValidMove(row, col, value)) {
      alert(`❌ ${value} already exists in this row or column.`);
      return;
    }

    const updated = board.map((r) => [...r]); // deep copy
    updated[row][col] = value;
    setBoard(updated);
  };

  return (
    <div className="container">
      <h1>Sudoku Game</h1>

      <div className="toolbar">
        <label>Choose Sorting Method: </label>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
        </select>
      </div>

      <div className="grid">
        {board.map((rowData, row) => (
          <div className="row" key={row}>
            {rowData.map((cellValue, col) => (
              <input
                key={`${row}-${col}`}
                className={`cell ${row % 3 === 0 ? "top" : ""} ${
                  col % 3 === 0 ? "left" : ""
                }`}
                type="text"
                maxLength="1"
                value={cellValue}
                disabled={
                  isGiven(row, col) ||
                  (row === LOCK_ROW && col === LOCK_COL && !sortCompleted)
                }
                onChange={(e) => handleChange(row, col, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>

      <SortChallenge
        sortType={sortType}
        onComplete={() => setSortCompleted(true)} // unlock (0,0)
        resetSort={() => setSortCompleted(false)} // re-lock on reset
      />
    </div>
  );
}

export default App;
