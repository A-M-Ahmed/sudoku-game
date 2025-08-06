import React, { useState } from 'react';
import './App.css';


function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null).map(() => Array(9).fill(''))
  );
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
                onChange={(e) => handleChange(row, col, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

}

export default App;
