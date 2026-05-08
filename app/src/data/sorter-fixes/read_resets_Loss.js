import reward from "../components/Run.jsx";
import { useState } from "react";

export default function ReadResets() {
    const [view, setView] = useState("Run");
    const [reward, setReward] = useState(reward);
    const [resets, setResets] = useState([]);
    resets.push("Reset 1");
    resets.push("Reset 2");
    resets.push("Reset 3");

    return (
        <div>
            <h2>Read Resets</h2>
            <p>Coming Soon!</p> 
        </div>
    );
}