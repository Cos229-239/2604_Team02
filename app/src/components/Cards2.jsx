import cards from "../data/cards2.json";

function Cards2() {
  const sortedCards = [...cards].sort((a, b) => {
    const costA = a.cost ?? 999;
    const costB = b.cost ?? 999;

    return costA - costB;
  });

  return (
    <div>
      <h2>Cards2 Test List</h2>

      {sortedCards.map((card) => (
        <div key={card.id}>
          <h3>{card.name}</h3>
          <p>Cost: {card.cost}</p>
          <p>Type: {card.type}</p>
          <p>Rarity: {card.rarity}</p>
          <p>Color: {card.color}</p>
        </div>
      ))}
    </div>
  );
}

export default Cards2;