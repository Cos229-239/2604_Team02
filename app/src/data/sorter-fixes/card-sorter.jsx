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

      <div style={{ marginTop: '16px' }}>
        {sortedCards.map((card) => (
          <div key={card.id} style={{ marginBottom: '16px' }}>
            <strong>{card.name}</strong> ({card.type}) - Cost: {card.cost}
            <br />
            <span>{card.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}