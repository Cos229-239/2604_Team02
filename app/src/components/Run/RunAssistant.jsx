//health ui, potions, energy, basic decision rules, relics
import { useState } from "react";
import ErrorBoundary from "../../data/sorter-fixes/error-handler/error-finder";
import { getPathRecommendation } from "../../data/sorter-fixes/runDecisionHelper";


  const AVAILABLE_RELICS = [
  { id: 'lantern', name: 'Lantern', description: '+1 Starting Energy' },
  { id: 'strawberry', name: 'Strawberry', description: '+10 Max HP' },
  { id: 'coffee_dripper', name: 'Coffee Dripper', description: '+1 Max Energy' },
  { id: 'anchor', name: 'Anchor', description: 'Start with Block' },
];


function RunAssistant({character, selectedAct}) {
    /*
    maxHp is currently hardcoded for now.

    Later, this can change based on the selected character,
    relics, upgrades, or run data.
  */
  const [relics, setRelics] = useState([]);
  const [upgradeLevel, setUpgradeLevel] = useState(0);
  const [maxEnergy, setMaxEnergy] = useState(3);
  const [maxHp, setMaxHp] = useState(80);
  const [healthStatus, setHealthStatus] = useState("healthy");
  const [runGoal, setRunGoal] = useState("balanced");
  const [pathType, setPathType] = useState("safe");

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
    setEnergy((previousEnergy) => Math.min(previousEnergy + 1, maxEnergy));
  };

  const useEnergy = () => {
    setEnergy((previousEnergy) => Math.max(previousEnergy - 1, 0));
  };

  // for relics
const addRelic = () => {
  const randomIndex = Math.floor(Math.random() * AVAILABLE_RELICS.length);
  const chosenRelic = AVAILABLE_RELICS[randomIndex];

  // Prevent duplicate relics
  if (relics.some((relic) => relic.id === chosenRelic.id)) {
    return;
  }

  setRelics((previousRelics) => [...previousRelics, chosenRelic]);

  if (chosenRelic.id === 'strawberry') {
    setMaxHp((previousMaxHp) => previousMaxHp + 10);
    setCurrentHp((previousHp) => previousHp + 10);
    setUpgradeLevel((previousLevel) => previousLevel + 1);
  }

  if (chosenRelic.id === 'coffee_dripper') {
    setMaxEnergy((previousMaxEnergy) => previousMaxEnergy + 1);
    setEnergy((previousEnergy) => previousEnergy + 1);
  }

  if (chosenRelic.id === 'lantern') {
    setEnergy((previousEnergy) => previousEnergy + 1);
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
          {relics.map((relic) => (
            <div key={relic.id}>
              ⚡ {relic.name} ({relic.description})
            </div>
          ))}
        </div>

        <button
          onClick={addRelic}
          className="mt-3 w-full rounded-xl bg-amber-600 hover:bg-amber-500 p-2 font-bold text-white"
        >
          Gain Random Relic
        </button>
      </div>
      </section>

        <section className="run-advice-layout">
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

          {/* Path recommendation card */}
          <div className="run-card pathing-card">
          <h3>Pathing Recommendation</h3>

          <div className="run-input-group">
            <label>Health Situation</label>
            <select
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
            >
              <option value="healthy">Healthy</option>
              <option value="injured">Injured</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="run-input-group">
            <label>Run Goal</label>
            <select
              value={runGoal}
              onChange={(e) => setRunGoal(e.target.value)}
            >
              <option value="balanced">Balanced</option>
              <option value="offense">Improve Damage</option>
              <option value="defense">Improve Defense</option>
              <option value="upgrades">Find Upgrades</option>
            </select>
          </div>

          <div className="run-input-group">
            <label>Path Type</label>
            <select
              value={pathType}
              onChange={(e) => setPathType(e.target.value)}
            >
              <option value="safe">Safe Path</option>
              <option value="elite">Elite Path</option>
              <option value="shop">Shop Path</option>
              <option value="rest">Rest Site Path</option>
            </select>
          </div>

          <div className="recommendation-box">
            <h4>Recommendation</h4>
            <p>
              {getPathRecommendation({
                healthStatus,
                runGoal,
                pathType,
                selectedAct,
              })}
            </p>
          </div>
        </div>
        </section>
    </main>
  );
}

export default RunAssistant;