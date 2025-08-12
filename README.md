# Sudoku + Sorting (React)

A simple Sudoku built with React + Vite. You must complete a tiny sorting challenge (Bubble or Selection) to unlock the board, then fill the grid. The app blocks row/column duplicates.

## Rules (this version)
- Fill the 9×9 grid with digits 1–9.
- No repeats in the same row or same column (enforced).
- 3×3 box rule is not enforced yet.
- Prefilled numbers (“givens”) are locked.
- You must sort once to unlock the board.

## How to play
1. Pick Bubble Sort or Selection Sort and click Sort Now (unlocks).
2. Click an empty cell and type 1–9.
3. If a number already exists in that row or column, the app blocks it.
4. Click Check Board to see conflicts or “no conflicts so far” (toast message).

## Tech
- React (Vite)
- react-hot-toast
- Plain CSS

## Setup
```bash
npm install
npm run dev
