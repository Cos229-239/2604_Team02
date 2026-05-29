import React, { useState, useEffect } from "react"; 
import characters from "../characters.json";
import acts from "../acts.json";

import cards from "../cards2.json";

export default function Statistics() {
    
    // Extract character IDs from your JSON
    const CHARACTER_IDS = characters.map(c => c.id);
    // Extarct card IDs from your JSON
    


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

    // Build an array of cards with win rates
    const cardWinData = CARD_IDS.map(card => {
        const s = cardStats[card] || { wins: 0, losses: 0 };
        const total = s.wins + s.losses;
        const winRate = total > 0 ? (s.wins / total) * 100 : null;

        return {
            id: card,
            wins: s.wins,
            losses: s.losses,
            total,
            winRate
        };
    });

    // Filter out cards with no data
    const filtered = cardWinData.filter(c => c.total > 0);

    // Sort by win rate descending
    filtered.sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0));

    // Determine top 3 — but expand to top 10 if ties occur
    let topCards = filtered.slice(0, 3);

    if (topCards.length > 0) {
        const thirdRate = topCards[topCards.length - 1].winRate;

        // Find all cards tied with the 3rd place card
        const tied = filtered.filter(c => c.winRate === thirdRate);

        // If ties push the list above 3, expand to max 10
        if (tied.length > 1) {
            topCards = filtered.slice(0, 10);
        }
    }

    

    return (
        <div className="run-statistics">
            <h2 className="text-xl font-bold text-amber-300 mb-2">Run Statistics</h2>

            <div className="stats-grid">
            {/* Character Selector */}
            <div className="stats-card">
                <h4>Select Character</h4>

                <div className="button-group">
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
                <h4>Select Act</h4>

                <div className="button-group">
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
            </div>
            </div>

            {/* Ask Win/Loss */}
                <div className="stats-card">
                    <h4>Did you complete the act?</h4>

                    <p className="text-amber-100">
                        {selectedCharacter} — {selectedAct}
                    </p>

                    {!asked ? (
                        <div className="button-group">
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
                    ) : (
                        <p className="text-amber-100 mt-2">Result recorded!</p>
                    )}
            </div>


            {/* Stats Display */}
            <div className="stats-card">
                <h4>Record Summary</h4>

                <div className="text-amber-100">
                    <p className="mt-4 text-lg font-bold">Top Cards</p>

{topCards.length === 0 ? (
    <p>No card data yet.</p>
) : (
    topCards.map(card => (
        <p key={card.id}>
            {card.id}: {card.winRate.toFixed(1)}% win rate 
            ({card.wins}W / {card.losses}L)
        </p>
    ))
)}

                </div>
            </div>
        </div>
    </div>
    );
}
