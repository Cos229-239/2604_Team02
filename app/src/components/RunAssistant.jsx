//health ui, potions, energy, basic decision rules, relics
import { useState } from 'react';
import ErrorBoundary from '../data/sorter-fixes/error-handler/error-finder';

function RunAssistant({character, selectedAct}) {
    /*
    maxHp is currently hardcoded for now.

    Later, this can change based on the selected character,
    relics, upgrades, or run data.
  */
  const [relics, setRelics] = useState([]);
  const [upgradeLevel, setUpgradeLevel] = useState(0);
  const [maxEnergy, setMaxEnergy] = useState(3);
  const maxHp = 80;

   /*
    State values track the current run situation.
   */
  const [currentHp, setCurrentHp] = useState(80);
  const [potions, setPotions] = useState(3);
  const [energy, setEnergy] = useState(3);

  /*
    Converts the players HP into a percentage.
   */
  const hpPercent = Math.round((currentHp / maxHp) * 100);


  // Basic decision rules (simple game logic)
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

  /*
  Run advice based on selected Act.
  */
  const getRunAdvice = () => {
    if (!character) {
      return "Select a character to get started.";
    }

    if (!selectedAct) {
      return "Choose your current act to receive tailored advice.";
    }

    if (selectedAct === "Act 1") {
      return `${character} In Act 1, Frontloaded damage and early defense are key. Prioritize strong attack cards and versatile options that will assist in Act 1 specific elites, and the Boss.`;
    }

    if (selectedAct === "Act 2") {
      return `${character} Act 2 is about sustainability, and scaling up for the late game. Focus on building a strong defense, and look for cards that can help you maintain HP while you set up for the endgame, while looking for powerful synergies.`;
    }

    if (selectedAct === "Act 3") {
      return `${character} In Act 3, it's all about maximizing your damage output and survivability. Look for high-impact cards that can help you burst down the Boss, provide utility such as energy or card draw, and prioritize defensive options that can help you survive the Boss's powerful attacks and mechanics.`;
    }

    return "Use the dropdowns to select your character and current act for general run advice.";
  };

  /*
  Handles changes to Hp input field
  */
  const handleHpChange = (event) => {
    let value = Number(event.target.value);

    if (value < 0) {
      value = 0;
    }

    if (value > maxHp) {
      value = maxHp;
    }
    setCurrentHp(value);
  };

  /*
  Handles changes to Potion inventory
  */
  const usePotionSlot = () => {
  setPotions((previousPotions) => Math.max(previousPotions - 1, 0));
  };

  const gainPotionSlot = () => {
  setPotions((previousPotions) => Math.min(previousPotions + 1, 3));
  };



  /*
  Handles changes to Energy economy
  */
    const gainEnergy = () => {
    setEnergy((previousEnergy) => Math.min(previousEnergy + 1, 10));
  };

  const useEnergy = () => {
    setEnergy((previousEnergy) => Math.max(previousEnergy - 1, 0));
  };

  // for relics
const addRelic = () => {
    const availableRelics = [
      'Lantern (+1 Starting Energy)',
      'Strawberry (+10 Max HP)',
      'Coffee Dripper (+1 Max Energy)',
      'Anchor (Start with Block)',
    ];

    const newRelic = availableRelics[Math.floor(Math.random() * availableRelics.length)];

    if (!relics.includes(newRelic)) {
      setRelics([...relics, newRelic]);

      if (newRelic.includes('Strawberry')) {
        setUpgradeLevel(upgradeLevel + 1);
      }

      if (newRelic.includes('Coffee Dripper')) {
        setMaxEnergy(maxEnergy + 1);
      }

      if (newRelic.includes('Lantern')) {
        setEnergy(Math.min(energy + 1, maxEnergy));
      }
    }
  };
  
  

  return (
<main className="run-assistant-page">
      {/* Page header that explains what this feature does */}
      <section className="run-assistant-header">
        <h2>Run Assistant</h2>

        <p>
          Track basic run details and receive simple decision guidance based on
          health, energy, and available potions.
        </p>
      </section>

      {/* Main layout grid that holds each Run Assistant card */}
      <section className="run-assistant-grid">
        {/* Health card */}
        <div className="run-card">
          <h3>Health</h3>

          {/* Displays current HP compared to max HP */}
          <div className="run-stat-main">
            {currentHp} / {maxHp}
          </div>

          {/* Health bar background */}
          <div className="run-health-bar">
            {/* 
              Health bar fill.
            */}
            <div
              className="run-health-fill"
              style={{ width: `${hpPercent}%` }}
            ></div>
          </div>

          {/* Input allows the user to manually update current HP */}
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

        {/* Energy card */}
        <div className="run-card">
          <h3>Energy</h3>

          {/* Displays current energy as a number */}
          <div className="run-stat-main">{energy}</div>

          {/* 
            Visual energy orbs.

            Array.from creates one orb for each point of energy.
            Example:
            energy = 3 creates 3 blue circles.
          */}
          <div className="run-energy-row">
            {Array.from({ length: energy }).map((_, index) => (
              <span className="energy-orb" key={index}></span>
            ))}
          </div>

          {/* Buttons for testing energy changes */}
          <div className="run-button-row">
            <button onClick={useEnergy}>Use Energy</button>
            <button onClick={gainEnergy}>Gain Energy</button>
          </div>
        </div>

        {/* Potion card */}
        <div className="run-card">
          <h3>Potions</h3>

          {/* Displays how many potions are left */}
          <div className="run-stat-main">{potions}</div>

          <p>Track available potion slots for the current run. Potion effects will be
             expanded later.
          </p>

          {/* 
            Potion button.

            Disabled when there are no potions left.
          */}
        <div className="run-button-row">
          <button onClick={usePotionSlot} disabled={potions <= 0}>
            Use Potion Slot
          </button>

            <button onClick={gainPotionSlot}>
              Add Potion
            </button>
          </div>
        </div>
        <div className="run-card">
  <div className="text-lg font-bold text-amber-300">Relics</div>

  <div className="mt-2 text-sm text-neutral-200 space-y-1">
    {relics.map((relic, index) => (
      <div key={index}>• {relic}</div>
    ))}
  </div>

  <button
    onClick={addRelic}
    className="mt-3 w-full rounded-xl bg-amber-600 hover:bg-amber-500 p-2 font-bold text-white"
  >
    Gain Random Relic
  </button>
</div>
        {/* Decision helper card */}
        <div className="run-card decision-card">
          <h3>Decision Helper</h3>

          {/* 
            Displays the current recommendation.

            This updates automatically whenever HP, energy,
            or potions change.
          */}
          <p>{getRunRecommendation()}</p>
         
          {/* Run advice card */}
          <h3>Run Advice</h3>
          
          {/*
          Displays broader run advice based on the selected character
          and current act.
          */}
          <p>{getRunAdvice()}</p>
        </div>
      </section>
    </main>
  );
}

export default RunAssistant;