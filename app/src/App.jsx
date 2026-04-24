import cards from "./data/cards.json";
import Card from "./components/Card";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Spire Architect</h1>
      <p>Slay the Spire Companion App</p>

      <h2>Card List</h2>

      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default App;