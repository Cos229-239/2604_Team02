import cards from "./data/cards2.json";
import Card from "./components/Card2";


function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Spire Architect</h1>
      <p>Slay the Spire Companion App</p>

      
      <h2>All Cards</h2>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}

    </div>
  );
}

export default App;