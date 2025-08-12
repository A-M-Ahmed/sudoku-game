````markdown
# Sudoku + Sorting (React)

A simple **Sudoku** built with **React + Vite**. You must complete a tiny **sorting challenge** (Bubble or Selection) to unlock the board, then fill the grid. The app blocks **row/column duplicates**.

---

## Rules (this version)

- Fill the 9×9 grid with digits **1–9**.
- No repeats in the **same row** or **same column** (enforced).
- 3×3 box rule is **not enforced** (yet).
- Prefilled numbers (“givens”) are locked.
- You must sort once to unlock the board.

---

## How to play

1. Pick **Bubble Sort** or **Selection Sort** → click **Sort Now** (unlocks).
2. Click an empty cell and type **1–9**.
3. If a number already exists in that row or column, the app blocks it.
4. Click **Check Board** to see conflicts or “no conflicts so far” (toast message).

---

## Tech

- React (Vite)
- react-hot-toast
- Plain CSS

---

## Setup

```bash
npm install
npm run dev
````

Open the shown local URL in your browser.

---

## Project structure

```
src/
  App.jsx            # Sudoku board, rules, state
  SortChallenge.jsx  # Bubble/Selection mini-game (unlocks board)
  App.css            # Grid styling (thick 3×3 borders, etc.)
```

---

## Code highlights

### Board & puzzle data

* **starterPuzzle**: 9×9 numbers; `0` means empty.
* **board** (state): 9×9 **strings** for inputs (convert `0 → ""`).

```js
const [board, setBoard] = useState(
  starterPuzzle.map(row => row.map(v => (v === 0 ? "" : String(v))))
);
```

### Locking & unlocking play

```jsx
const [canPlay, setCanPlay] = useState(false);
disabled={ isGiven(row, col) || !canPlay } // lock givens + all cells until sort

<SortChallenge
  sortType={sortType}
  onComplete={() => setCanPlay(true)}   // unlock
  resetSort={() => setCanPlay(false)}   // re-lock
/>
```

### Validating moves (row & column)

```js
const isValidMove = (row, col, value) => {
  for (let c = 0; c < 9; c++) if (c !== col && board[row][c] === value) return false;
  for (let r = 0; r < 9; r++) if (r !== row && board[r][col] === value) return false;
  return true;
};

const handleChange = (row, col, value) => {
  if (!/^[1-9]?$/.test(value)) return;                  // only 1–9 or empty
  if (value !== "" && !isValidMove(row, col, value)) {  // block duplicates
    alert(`❌ ${value} already exists in this row or column.`);
    return;
  }
  const updated = board.map(r => [...r]);               // safe 2D copy
  updated[row][col] = value;
  setBoard(updated);
};
```

### Sorting challenge (Bubble / Selection)

```js
const result = sortType === "bubble" ? bubbleSort(numbers) : selectionSort(numbers);
onComplete?.(); // unlocks the board after sorting
```

### Toasts

```jsx
import { Toaster, toast } from "react-hot-toast";
<Toaster position="top-center" />
```

---

## Data structures & algorithms

* **2D array (matrix)** for the grid (`board`).
* Safe 2D copy pattern: `board.map(r => [...r])`.
* **Bubble Sort** and **Selection Sort** implementations.
* Linear scans for row/column validation.

---

## Customize the puzzle

Edit `starterPuzzle` in `App.jsx`. Use `0` for blanks:

```js
const starterPuzzle = [
  [5,3,0, 0,7,0, 0,0,0],
  // ...
];
```


```
```
