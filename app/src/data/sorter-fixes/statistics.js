import react, { useState, useEffect } from "react";
import Reward from "../../components/Run.jsx";

export default function Statistics() {
    const [view, setView] = useState("Run");
    const [reward, setReward] = useState(Reward);
    
    return (
        <div>
            <h2>Statistics</h2>
            <p>Coming Soon!</p>
        </div>
    );
}