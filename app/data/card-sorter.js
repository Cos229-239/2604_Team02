import { useState } from 'react';

export default function SortCards({ card }) {
  const [sortedCards, setSortedCards] = useState([card]);
    const sortByCost = () => {
        const sorted = [...sortedCards].sort((a, b) => a.cost - b.cost);
        setSortedCards(sorted);
    };
    const sortByName = () => {
        const sorted = [...sortedCards].sort((a, b) => a.name.localeCompare(b.name));
        setSortedCards(sorted);
    };
    const sortByType = () => {
        const sorted = [...sortedCards].sort((a, b) => a.type.localeCompare(b.type));
        setSortedCards(sorted);
    };
    
  return ( 
    <div>
      <button onClick={sortByCost}>Sort by Cost</button>
      <button onClick={sortByName}>Sort by Name</button>
        <button onClick={sortByType}>Sort by Type</button>
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