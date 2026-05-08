import {useState, useEffect} from "react";
import deck from "../coponents/run.jsx";

export default function SaveDeckProfile() {
    const [view, setView] = useState("Run");
    const [deckData, setDeckData] = useState(deck);

    useEffect(() => {
        // Logic to save deckData to local storage or backend
        console.log("Deck data saved:", deckData);
    }, [deckData]);

    return (
        <div>
            <h2>Save Deck Profile</h2>
            
            <p>Coming Soon!</p>
        </div>
    );
}