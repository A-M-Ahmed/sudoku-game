import React, { useState } from "react";
import "./App.css";
import SortChallenge from "./SortChallenge";
import { Toaster, toast } from "react-hot-toast";

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

function App() {
  // Convert 0 -> "" so inputs start empty
  const [board, setBoard] = useState(
    starterPuzzle.map(row => row.map(v => (v === 0 ? "" : String(v))))
  );

  const [sortType, setSortType] = useState("bubble");
  const [canPlay, setCanPlay] = useState(false); // <- NEW: lock board until sort done

  // True if this cell is a prefilled number in the starter puzzle (non-zero).
// Prefilled cells are locked; 0 means empty/editable.
  const isGiven = (r, c) => starterPuzzle[r][c] !== 0;

  // Validate row + column (simple rules)
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
    // Only allow digits 1–9 or empty not characters
    if (!/^[1-9]?$/.test(value)) return;

    if (value !== "" && !isValidMove(row, col, value)) {
      alert(`❌ ${value} already exists in this row or column.`);
      return;
    }

    const updated = board.map(r => [...r]); // deep copy and makes new array(memory location)
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

      {!canPlay && (
        <p className="hint">➡️ Do the Sorting Challenge below to start playing.</p>
      )}

      <div className="grid">
        {board.map((rowData, row) => (
          <div className="row" key={row}>
            {rowData.map((cellValue, col) => (
              <input
                key={`${row}-${col}`}
                className={`cell ${row % 3 === 0 ? "top" : ""} ${col % 3 === 0 ? "left" : ""}`}
                type="text"
                maxLength="1"
                value={cellValue}
                disabled={isGiven(row, col) || !canPlay}  // <- lock ALL non-givens until sort
                onChange={(e) => handleChange(row, col, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>

      <SortChallenge
        sortType={sortType}
        onComplete={() => setCanPlay(true)}   // unlock board after sort
        resetSort={() => setCanPlay(false)}   // re-lock on reset
      />
       <Toaster position="top-center" />
    </div>
  );
}

export default App;
