//health ui
import React, { useState } from 'react';

export default function App(){
  const maxHP = 80;
  const [hp, setHp] = useState(80);
  const [input, setInput] = useState('80');

  const updateHealth = () => {
    let value = parseInt(input || '0', 10);
    if (isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > maxHP) value = maxHP;
    setHp(value);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      <div className="w-80 rounded-2xl border-4 border-amber-400 bg-gradient-to-b from-amber-900 to-stone-950 p-6 shadow-2xl text-center">
        <h1 className="text-2xl font-bold text-amber-200 mb-4">Health</h1>
        <div className="mx-auto h-40 w-40 rounded-full border-4 border-yellow-400 bg-radial-[at_30%_30%] from-red-400 via-red-600 to-red-900 flex items-center justify-center shadow-lg">
          <span className="text-white text-3xl font-bold">{hp} / {maxHP}</span>
        </div>
        <input
          type="number"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          className="mt-6 w-full rounded-xl border-2 border-amber-400 bg-neutral-800 p-3 text-center text-white"
          placeholder="Enter HP"
        />
        <button
          onClick={updateHealth}
          className="mt-4 w-full rounded-xl bg-amber-600 hover:bg-amber-500 p-3 font-bold text-white"
        >
          Update Health
        </button>
      </div>
    </div>
  )
}
