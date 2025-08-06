import React, { useState } from 'react';

function SortChallenge({ sortType }) {
  const [numbers, setNumbers] = useState([5, 2, 9, 1]);
  const [sorted, setSorted] = useState(false);

  const bubbleSort = (arr) => {
    const sortedArr = [...arr];
    for (let i = 0; i < sortedArr.length - 1; i++) {
      for (let j = 0; j < sortedArr.length - i - 1; j++) {
        if (sortedArr[j] > sortedArr[j + 1]) {
          [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
        }
      }
    }
    return sortedArr;
  };

  const selectionSort = (arr) => {
    const sortedArr = [...arr];
    for (let i = 0; i < sortedArr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < sortedArr.length; j++) {
        if (sortedArr[j] < sortedArr[minIndex]) {
          minIndex = j;
        }
      }
      [sortedArr[i], sortedArr[minIndex]] = [sortedArr[minIndex], sortedArr[i]];
    }
    return sortedArr;
  };

  const handleSort = () => {
    const result = sortType === 'bubble' ? bubbleSort(numbers) : selectionSort(numbers);
    setNumbers(result);
    setSorted(true);
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Sorting Challenge ({sortType})</h2>
      <div style={{ fontSize: '20px', marginBottom: '10px' }}>
        {numbers.join(', ')}
      </div>
      <button onClick={handleSort} disabled={sorted}>
        Sort Now
      </button>
      {sorted && <p>✅ Sorted!</p>}
    </div>
  );
}

export default SortChallenge;
