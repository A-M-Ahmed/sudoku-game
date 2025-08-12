import React, { useState } from "react";
import toast from "react-hot-toast";

function SortChallenge({ sortType, onComplete, resetSort }) {
  const generateRandomArray = () =>
    Array.from({ length: 4 }, () => Math.floor(Math.random() * 9) + 1);

  const [numbers, setNumbers] = useState(generateRandomArray());
  const [sorted, setSorted] = useState(false);

  const bubbleSort = (arr) => {
    const a = [...arr];
    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
    return a;
  };

  const selectionSort = (arr) => {
    const a = [...arr];
    for (let i = 0; i < a.length; i++) {
      let min = i;
      for (let j = i + 1; j < a.length; j++) {
        if (a[j] < a[min]) min = j;
      }
      [a[i], a[min]] = [a[min], a[i]];
    }
    return a;
  };

  const handleSort = () => {
    const result = sortType === "bubble" ? bubbleSort(numbers) : selectionSort(numbers);
    setNumbers(result);
    setSorted(true);
    onComplete?.(); // tell App the challenge is completed
    toast.success("Well")
  };

  const handleReset = () => {
    setNumbers(generateRandomArray());
    setSorted(false);
    resetSort?.(); // tell App to re-lock
  };

  return (
    <div className="sortBox">
      <h2>Sorting Challenge ({sortType})</h2>
      <div className="numbers">{numbers.join(", ")}</div>
      <button onClick={handleSort} disabled={sorted}>Sort Now</button>
      <button onClick={handleReset} className="ml">Reset</button>
      {sorted && <p className="ok">✅ Sorted!</p>}
    </div>
  );
}

export default SortChallenge;
