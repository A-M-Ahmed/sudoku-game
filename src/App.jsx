import React, { useState } from "react";
import "./App.css";
import SortChallenge from "./SortChallenge";

function App() {
  const [board, setBoard] = useState(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(""))
  );
  const [sortType, setSortType] = useState("bubble"); // default is bubble
  const [sortCompleted, setSortCompleted] = useState(false);

  const isValidMove = (row, col, value) => {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== col && board[row][c] === value) {
      return false;
    }
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== row && board[r][col] === value) {
      return false;
    }
  }

  return true; // Valid move
};

  const handleChange = (row, col, value) => {
    // Only allow digits 1–9
if (!/^[1-9]?$/.test(value)) return;

if (value !== '' && !isValidMove(row, col, value)) {
  alert(`❌ ${value} already exists in this row or column.`);
  return;
}

const updatedBoard = board.map((r) => [...r]); // deep copy
updatedBoard[row][col] = value;
setBoard(updatedBoard);

  };

  
  return (
    <div className="container">
      <h1>Sudoku Game</h1>
      <div style={{ marginBottom: "20px" }}>
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
                className="cell"
                type="text"
                maxLength="1"
                value={cellValue}
                disabled={row === 0 && col === 0 && !sortCompleted}
                onChange={(e) => handleChange(row, col, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>
      <SortChallenge
        sortType={sortType}
        onComplete={() => setSortCompleted(true)}
          resetSort={() => setSortCompleted(false)}
      />
    </div>
  );
}

export default App;
