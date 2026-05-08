import { useState } from "react";
import cards from "./data/cards2.json";
import Card from "./components/Cards2";
import RewardChooser from "./components/Run";

function App() {
  const [page, setPage] = useState("home");
  return (
    <div style={{ padding: "20px" }}>
      <h1>Spire Architect</h1>
      <p>Slay the Spire Companion App</p>

      <button onClick={() => setPage("Home")}
      style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px" }}>
  Home
</button>
      <button onClick={() => setPage("Run")}
      style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px" }}>
  Current Run
</button>
 {page === "Home" && (
  <>
      <h2>All Cards</h2>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
</>
 )}
  {page === "Run" && (
      <RewardChooser />
    )}
    </div>
  );
}

export default App;