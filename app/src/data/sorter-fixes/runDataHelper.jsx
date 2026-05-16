import React, { useState, useEffect } from 'react';
//import { useSelector } from 'react-redux'; //do not remove this untill absoltly needed -james


import monsters from "../monsters.json";
import Relic from "../relics.json";
import Character from "../characters.json";
import enchantments from "../enchantments.json";
import afflictions from "../afflictions.json";
import potions from "../potions.json";
import intents from "../intents.json";
import powers from "../powers.json";
import keywords from "../keywords.json";
import assistant from "../assistant.json";
import SortCards from "./card-sorter";
import cards from "../cards2.json";
import Statistics from "./statistics";

export default function DataHelper() {
    const [characters, setCharacters] = useState([]);
    const [monstersData, setMonstersData] = useState([]);
    const [relics, setRelics] = useState([]);
    const [enchantmentsData, setEnchantmentsData] = useState([]);
    const [afflictionsData, setAfflictionsData] = useState([]);
    const [potionsData, setPotionsData] = useState([]);
    const [intentsData, setIntentsData] = useState([]);
    const [powersData, setPowersData] = useState([]);
    const [keywordsData, setKeywordsData] = useState([]);
    const [currentRun, setCurrentRun] = useState(null);
    const [showStatistics, setShowStatistics] = useState(false);
    const [showDeck, setShowDeck] = useState(false);
    const [sortedCards, setSortedCards] = useState([]);
    const [cardsData, setCardsData] = useState([]);
    const [view, setView] = useState("Statistics"); // "Run" or "Statistics"

    // Load all data on mount
    useEffect(() => {
        setCharacters(Character);
        setMonstersData(monsters);
        setRelics(Relic);
        setEnchantmentsData(enchantments);
        setAfflictionsData(afflictions);
        setPotionsData(potions);
        setIntentsData(intents);
        setPowersData(powers);
        setKeywordsData(keywords);
    }, []);

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
