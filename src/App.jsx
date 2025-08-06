import './App.css';  // we'll add styles here

function App() {
  return (
    <div className="container">
      <h1>Sudoku Game</h1>
      <div className="grid">
        {Array(9).fill(null).map((_, row) => (
          <div className="row" key={row}>
            {Array(9).fill(null).map((_, col) => (
              <input
                key={`${row}-${col}`}
                className="cell"
                type="text"
                maxLength="1"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
