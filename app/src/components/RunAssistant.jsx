//health ui, potions, energy, basic decision rules, relics, refactored
import React, { useState } from 'react';

// Define relics cleanly outside the component to prevent recreating the array on every render
const AVAILABLE_RELICS = [
  { id: 'lantern', name: 'Lantern', description: '+1 Starting Energy' },
  { id: 'strawberry', name: 'Strawberry', description: '+10 Max HP' },
  { id: 'coffee_dripper', name: 'Coffee Dripper', description: '+1 Max Energy' },
  { id: 'anchor', name: 'Anchor', description: 'Start with Block' },
];

function RunAssistant({ character, selectedAct }) {
  // --- STATE VALUES ---
  const [maxHp, setMaxHp] = useState(80);
  const [currentHp, setCurrentHp] = useState(80);
  const [potions, setPotions] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [maxEnergy, setMaxEnergy] = useState(3);
  const [relics, setRelics] = useState([]);
  const [upgradeLevel, setUpgradeLevel] = useState(0);

  // --- DERIVED STATE (Calculates automatically on re-render) ---
  const hpPercent = Math.round((currentHp / maxHp) * 100);

  // --- DYNAMIC DECISION LOGIC ---
  const getRunRecommendation = () => {
    if (currentHp <= 20 && potions > 0) {
      return 'Low HP: Consider enemy intent and using a Potion to preserve HP';
    }
    if (energy === 0) {
      return 'No Energy: End turn or recover energy';
    }
    if (currentHp <= 30) {
      return 'Critical HP: Focus on defense or prioritize stronger defense cards';
    }
    if (energy >= 2 && currentHp > 50) {
      return 'Healthy: Look for a strong attack or combo';
    }
    return 'Balanced: Consider enemy intent before deciding';
  };

  const getRunAdvice = () => {
    if (!character) return 'Select a character to get started.';
    if (!selectedAct) return 'Choose your current act to receive tailored advice.';

    switch (selectedAct) {
      case 'Act 1':
        return `${character}: In Act 1, Frontloaded damage and early defense are key. Prioritize strong attack cards and versatile options that will assist in Act 1 specific Elites.`;
      case 'Act 2':
        return `${character}: Act 2 is about sustainability, and scaling up for the late game. Focus on building a strong defense, and look for cards that can help you maintain HP.`;
      case 'Act 3':
        return `${character}: In Act 3, it's all about maximizing your damage output and survivability. Look for high-impact cards that can close out fights quickly.`;
      default:
        return 'Use the dropdowns to select your character and current act for general run advice.';
    }
  };

  // --- HANDLERS ---
  const handleHpChange = (event) => {
    let value = Number(event.target.value);
    if (value < 0) value = 0;
    if (value > maxHp) value = maxHp;
    setCurrentHp(value);
  };

  const usePotionSlot = () => setPotions((prev) => Math.max(prev - 1, 0));
  const gainPotionSlot = () => setPotions((prev) => Math.min(prev + 1, 3));
  
  const useEnergy = () => setEnergy((prev) => Math.max(prev - 1, 0));
  const gainEnergy = () => setEnergy((prev) => Math.min(prev + 1, maxEnergy));

  const addRelic = () => {
    const randomIndex = Math.floor(Math.random() * AVAILABLE_RELICS.length);
    const chosenRelic = AVAILABLE_RELICS[randomIndex];

    // Avoid duplicate relics if you want to match game mechanics
    if (relics.some(r => r.id === chosenRelic.id)) return;

    setRelics((prevRelics) => [...prevRelics, chosenRelic]);

    // Handle relic specific side-effects cleanly
    if (chosenRelic.id === 'strawberry') {
      setMaxHp((prev) => prev + 10);
      setCurrentHp((prev) => prev + 10); // Typically heals you for 10 too!
      setUpgradeLevel((prev) => prev + 10);
    } else if (chosenRelic.id === 'coffee_dripper') {
      setMaxEnergy((prev) => prev + 1);
    } else if (chosenRelic.id === 'lantern') {
      setEnergy((prev) => Math.min(prev + 1, maxEnergy));
    }
  };

  // --- RENDER ---
  return (
    <main className="run-assistant-page">
      <section className="run-assistant-header">
        <h2>Run Assistant</h2>
        <p>Track basic run details and receive simple decision guidance based on health, energy, and available potions.</p>
      </section>

      <section className="run-assistant-grid">
        {/* Health Card */}
        <div className="run-card">
          <h3>Health</h3>
          <div className="run-stat-main">{currentHp} / {maxHp}</div>
          
          <div className="run-health-bar">
            <div className="run-health-fill" style={{ width: `${hpPercent}%` }}></div>
          </div>

          <label htmlFor="currentHp">Current HP</label>
          <input
            id="currentHp"
            type="number"
            value={currentHp}
            min="0"
            max={maxHp}
            onChange={handleHpChange}
          />
        </div>

        {/* Energy Card */}
        <div className="run-card">
          <h3>Energy</h3>
          <div className="run-stat-main">{energy}</div>
          
          <div className="run-energy-row">
            {Array.from({ length: energy }).map((_, index) => (
              <span className="energy-orb" key={index}></span>
            ))}
          </div>

          <div className="run-button-row">
            <button onClick={useEnergy}>Use Energy</button>
            <button onClick={gainEnergy}>Gain Energy</button>
          </div>
        </div>

        {/* Potion Card */}
        <div className="run-card">
          <h3>Potions</h3>
          <div className="run-stat-main">{potions}</div>
          <p>Track available potion slots for the current run.</p>
          
          <div className="run-button-row">
            <button onClick={usePotionSlot} disabled={potions <= 0}>Use Potion Slot</button>
            <button onClick={gainPotionSlot}>Add Potion</button>
          </div>
        </div>

        {/* Relics Section */}
        <div className="text-lg font-bold text-amber-300">Relics</div>
        <div className="mt-2 text-sm text-neutral-200 space-y-1">
          {relics.map((relic, index) => (
            <div key={index}>⚡ {relic.name} ({relic.description})</div>
          ))}
        </div>
        
        <button 
          onClick={addRelic} 
          className="mt-3 w-full rounded-xl bg-amber-600 hover:bg-amber-500 p-2 font-bold text-white"
        >
          Gain Random Relic
        </button>

        {/* Decision Helper Card */}
        <div className="run-card decision-card">
          <h3>Decision Helper</h3>
          <p>{getRunRecommendation()}</p>
          
          <h3>Run Advice</h3>
          <p>{getRunAdvice()}</p>
        </div>
      </section>
    </main>
  );
}

export default RunAssistant;