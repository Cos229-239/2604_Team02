import React, { useState, useEffect } from "react";
//import characters from "../components/data/characters.json"; issues with pulling data from here, so leaving it out for now -james

//import acts from "../components/data/acts.json"; issues with pulling data from here, so leaving it out for now -james
import characters from "../characters.json";
import acts from "../acts.json";

export default function Statistics({
    currentCharacter,
    currentDeck = [],
    currentChoices = [],
}) {
    // Extract character IDs from your JSON
    const CHARACTER_IDS = characters.map(c => c.id);

    // Extract act IDs from your JSON (skip DEPRECATED_ACT)
    const ACT_IDS = acts
        .filter(a => a.id !== "DEPRECATED_ACT")
        .map(a => a.id);

    const [stats, setStats] = useState({});
    const [selectedAct, setSelectedAct] = useState(ACT_IDS[0]);
    const [asked, setAsked] = useState(false);

    const selectedCharacter = currentCharacter || CHARACTER_IDS[0];

    // Load stats on mount
    useEffect(() => {
        const stored = localStorage.getItem("runStats");
        if (stored) {
            setStats(JSON.parse(stored));
        } else {
            // Build stats structure dynamically from JSON
            const initial = {};
            CHARACTER_IDS.forEach(char => {
                initial[char] = {};
                ACT_IDS.forEach(act => {
                    initial[char][act] = { wins: 0, losses: 0 };
                });
            });
            setStats(initial);
        }
    }, []);

    // Save stats whenever they change
    useEffect(() => {
        if (Object.keys(stats).length > 0) {
            localStorage.setItem("runStats", JSON.stringify(stats));
        }
    }, [stats]);

    const handleResult = (didWin) => {
        const updated = { ...stats };

        if(!updated[selectedCharacter]) {
            updated[selectedCharacter] = {};
        }
        if(!updated[selectedCharacter][selectedAct]) {
            updated[selectedCharacter][selectedAct] = { wins: 0, losses: 0 };
        }

        const entry = updated[selectedCharacter][selectedAct];

        if (didWin) entry.wins += 1;
        else entry.losses += 1;

        setStats(updated);
        setAsked(true);
    };

    const attackCount = currentDeck.filter((card) => card.type === "Attack").length;
    const skillCount = currentDeck.filter((card) => card.type === "Skill").length;
    const powerCount = currentDeck.filter((card) => card.type === "Power").length;
    const curseCount = currentDeck.filter((card) => card.type === "Curse").length;

    const current = stats[selectedCharacter]?.[selectedAct] || { wins: 0, losses: 0 };

    const total = current.wins + current.losses;
    const winRate = total > 0 ? ((current.wins / total) * 100).toFixed(1) : 0;
    const lossRate = total > 0 ? ((current.losses / total) * 100).toFixed(1) : 0;

    return (
        <div>
            <h2 className="text-xl font-bold text-amber-300 mb-2">Run Statistics</h2>

            <div className="text-amber-100 mb-4">
                <p>Current Character: {selectedCharacter}</p>
                <p>Deck Size: {currentDeck.length}</p>
                <p>Attacks: {attackCount}</p>
                <p>Skills: {skillCount}</p>
                <p>Powers: {powerCount}</p>
                <p>Curses: {curseCount}</p>
                <p>Reward Choices Selected: {currentChoices.length}</p>
            </div>
            
            {/* Act Selector */}
            <div className="mb-4">
                <p className="text-amber-200">Select Act</p>
                {ACT_IDS.map(act => (
                    <button
                        key={act}
                        onClick={() => { setSelectedAct(act); setAsked(false); }}
                        className={`py-1 px-3 m-1 rounded ${
                            selectedAct === act
                                ? "bg-amber-600 text-white"
                                : "bg-amber-400 text-black"
                        }`}
                    >
                        {act}
                    </button>
                ))}
            </div>

            {/* Ask Win/Loss */}
            {!asked && (
                <div className="mb-4">
                    <p className="text-amber-200 mb-2">Did you complete the act?</p>

                    <button
                        onClick={() => handleResult(true)}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded m-1"
                    >
                        Yes (Win)
                    </button>

                    <button
                        onClick={() => handleResult(false)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded m-1"
                    >
                        No (Loss)
                    </button>
                </div>
            )}

            {/* Stats Display */}
            <div className="text-amber-100">
                <p className="text-lg font-bold">{selectedCharacter} — {selectedAct}</p>
                <p>Total Runs: {total}</p>
                <p>Wins: {current.wins}</p>
                <p>Losses: {current.losses}</p>
                <p>Win Rate: {winRate}%</p>
                <p>Loss Rate: {lossRate}%</p>
            </div>
        </div>
    );
}
