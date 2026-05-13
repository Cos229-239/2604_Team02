import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import cards from "./cards2.json";
import SortCards from "./sorter-fixes/card-sorter";

import Monster from "../components/data/monsters.json";
import Relic from "../components/data/relics.json";
import Character from "../components/data/characters.json";
import enhancements from "../components/data/enhancements.json";
import encounters from "../components/data/encounters.json";
import afflictions from "../components/data/afflictions.json";
import potions from "../components/data/potions.json";
import intents from "../components/data/intents.json";
import powers from "../components/data/powers.json";
import keywords from "../components/data/keywords.json";
import assistant from "../components/data/assistant.json";

import Statistics from "./statistics";

export default function Assistant() {
    const reduxCharacter = useSelector((state) => state.character);

    const [currentRun, setCurrentRun] = useState(null);
    const [showStatistics, setShowStatistics] = useState(false);

    // Load current run or fallback to assistant.json
    useEffect(() => {
        const storedRun = localStorage.getItem("currentRun");
        if (storedRun) {
            setCurrentRun(JSON.parse(storedRun));
        } else {
            setCurrentRun(assistant);
        }
    }, []);

    // Auto-save whenever the run changes
    useEffect(() => {
        if (currentRun) {
            localStorage.setItem("currentRun", JSON.stringify(currentRun));
        }
    }, [currentRun]);

    const toggleStatistics = () => {
        setShowStatistics(!showStatistics);
    };

    if (!currentRun) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
            <div className="w-96 rounded-2xl border-4 border-amber-400 bg-gradient-to-b from-amber-900 to-stone-950 p-6 shadow-2xl text-center">

                <h1 className="text-2xl font-bold text-amber-200 mb-4">Run Assistant</h1>

                {/* SHOW CHARACTER */}
                <h2 className="text-xl text-amber-300 mb-2">
                    Character: {currentRun.character}
                </h2>

                {/* SHOW ACT IF PRESENT */}
                {currentRun.act && (
                    <h3 className="text-lg text-amber-300 mb-2">
                        Act: {currentRun.act}
                    </h3>
                )}

                {/* SHOW CURRENT DECK */}
                <h3 className="text-lg text-amber-200">Current Deck</h3>
                {currentRun.deck.length === 0 && (
                    <p className="text-amber-100">No cards yet.</p>
                )}
                {currentRun.deck.map((card, index) => (
                    <div key={index} className="text-amber-100">
                        {card.name}
                    </div>
                ))}

                {/* CARD PICKER */}
                <h3 className="text-lg text-amber-200 mt-4">Add Cards</h3>
                <SortCards
                    cards={cards}
                    onSelect={(card) => {
                        const updated = {
                            ...currentRun,
                            deck: [...currentRun.deck, card]
                        };
                        setCurrentRun(updated);
                    }}
                />

                {/* STATISTICS */}
                <button
                    className="bg-amber-500 hover:bg-amber-600 text-amber-200 font-bold py-2 px-4 rounded mt-4"
                    onClick={toggleStatistics}
                >
                    {showStatistics ? "Hide" : "Show"} Statistics
                </button>

                {showStatistics && (
                    <Statistics
                        currentCharacter={currentRun.character}
                        currentAct={currentRun.act}
                    />
                )}
            </div>
        </div>
    );
}
