import { useState, useEffect } from 'react';

export default function SortCards({ cards }) {
  const [sortedCards, setSortedCards] = useState([  ]);

  // Sort once when the page loads
  useEffect(() => {
    const initial = [...cards].sort((a, b) => a.cost - b.cost);
    setSortedCards(initial);
  }, [cards]);

  const sortByCost = () => {
    setSortedCards([...sortedCards].sort((a, b) => a.cost - b.cost));
  };

  const sortByName = () => {
    setSortedCards([...sortedCards].sort((a, b) => a.name.localeCompare(b.name)));
  };
  
  return (
    <div>
      <button onClick={sortByCost}>Sort by Cost</button>
      <button onClick={sortByName}>Sort by Name</button>

      <div className="card-grid">
        {sortedCards.map((card) => (
          <div
            key={card.id}
            className="card"
            onClick={() => onSelect && onSelect(card)}
            style={{ cursor: "pointer" }}
          >
            <h3>{card.name}</h3>
            <p>Cost: {card.cost}</p>
            <p>Type: {card.type}</p>
            <p>Rarity: {card.rarity}</p>
            <p>Damage: {card.damage}</p>
            <p>Block: {card.block}</p>
            <p>Magic: {card.magic}</p>
            <p>Description: {card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

  
