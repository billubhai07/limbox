
import React, { useState, useEffect } from 'react';

function Limbox2x() {
  const [history, setHistory] = useState([]);
  const [current, setCurrent] = useState('');
  const [cycle, setCycle] = useState([]);
  const [advice, setAdvice] = useState('Waiting for data...');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (cycle.length >= 2 && cycle.slice(-2).every(x => x < 2)) {
      setAdvice("🔥 Suggest: Bet on 2x now");
    } else {
      setAdvice("⚠️ Wait: Not safe to enter yet");
    }
  }, [cycle]);

  const addToHistory = () => {
    const num = parseFloat(current);
    if (!isNaN(num)) {
      const updated = [...cycle, num].slice(-10);
      setCycle(updated);
      setHistory(prev => [num, ...prev].slice(0, 20));
      setStreak(num < 2 ? streak + 1 : 0);
      setCurrent('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Limbox — 2x Strategy</h1>
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-2xl mb-6">
        <p className="text-lg">Enter last multiplier result:</p>
        <input
          className="w-full mt-2 p-2 text-black rounded"
          value={current}
          onChange={e => setCurrent(e.target.value)}
          placeholder="e.g. 1.94"
        />
        <button onClick={addToHistory} className="w-full mt-4 p-2 bg-green-600 rounded hover:bg-green-700">
          Submit
        </button>
        <p className="text-xl font-semibold text-green-400 mt-4">{advice}</p>
        <p className="text-sm text-gray-400">Loss streak: {streak}</p>
        <div className="w-full bg-gray-700 h-2 rounded mt-1">
          <div className="bg-red-500 h-2 rounded" style={{ width: `${Math.min((streak / 5) * 100, 100)}%` }}></div>
        </div>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-xl mb-2">Last 10 Results</h2>
        <div className="grid grid-cols-5 gap-2 text-center text-sm">
          {history.map((val, idx) => (
            <div key={idx} className={`p-2 rounded ${val < 2 ? 'bg-red-600' : 'bg-green-600'}`}>{val}</div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-xs text-gray-500">Made by Sumit • Limbox v1.0</p>
    </div>
  );
}

export default Limbox2x;
