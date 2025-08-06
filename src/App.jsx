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

  const handleChange = (row, col, value) => {
    // Only allow digits 1–9
    if (!/^[1-9]?$/.test(value)) return;

    const updatedBoard = [...board];
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
