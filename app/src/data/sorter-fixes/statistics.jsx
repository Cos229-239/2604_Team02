import React, { useState, useEffect } from "react"; 
import characters from "../characters.json";
import acts from "../acts.json";

import cards from "../cards2.json";

export default function Statistics() {
    
    // Extract character IDs from your JSON
    const CHARACTER_IDS = characters.map(c => c.id);
    // Extarct card IDs from your JSON
    const CARD_IDS= cards.map(c => c.id);


    // Extract act IDs from your JSON (skip DEPRECATED_ACT)
    const ACT_IDS = acts
        .filter(a => a.id !== "DEPRECATED_ACT")
        .map(a => a.id);

    const [stats, setStats] = useState({});
    const [selectedCharacter, setSelectedCharacter] = useState(CHARACTER_IDS[0]);
    const [selectedAct, setSelectedAct] = useState(ACT_IDS[0]);
    const [asked, setAsked] = useState(false);
    

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
        const entry = updated[selectedCharacter][selectedAct];

        if (didWin) entry.wins += 1;
        else entry.losses += 1;

        setStats(updated);
        setAsked(true);
    };

    const current = stats[selectedCharacter]?.[selectedAct] || { wins: 0, losses: 0 };
    const total = current.wins + current.losses;
    const winRate = total > 0 ? ((current.wins / total) * 100).toFixed(1) : 0;
    const lossRate = total > 0 ? ((current.losses / total) * 100).toFixed(1) : 0;
    const cardStats = current.cardStats || {};
    const cardRatios = {};

    // Calculate card win/loss ratios for the top 3 cards in the current deck (or all if less than 3)
    CARD_IDS.forEach(card => {
        const stats = cardStats[card] || { wins: 0, losses: 0 };
        const totalCard = stats.wins + stats.losses;
        cardRatios[card] = totalCard > 0 ? ((stats.wins / totalCard) * 100).toFixed(1) + '%' : 'N/A';
    });

    return (
        <div>
            <h2 className="text-xl font-bold text-amber-300 mb-2">Run Statistics</h2>

            {/* Character Selector */}
            <div className="mb-2">
                <p className="text-amber-200">Select Character</p>
                {CHARACTER_IDS.map(char => (
                    <button
                        key={char}
                        onClick={() => { setSelectedCharacter(char); setAsked(false); }}
                        className={`py-1 px-3 m-1 rounded ${
                            selectedCharacter === char
                                ? "bg-amber-600 text-white"
                                : "bg-amber-400 text-black"
                        }`}
                    >
                        {char}
                    </button>
                ))}
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
                <p className="mt-4 text-lg font-bold">Card Performance</p>
                {CARD_IDS.map(card => (
                    <p key={card}>
                        {card}: {cardRatios[card]} win rate
                    </p>
                ))}
            </div>
        </div>
    );
}
