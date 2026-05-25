import { useState, useEffect } from 'react';

const SPIRE_CODEX_BASE_URL = "https://beta.spire-codex.com";

const getCardImageUrl = (card) => {
  if (!card.image_url) {
    return null;
  }
  return `${SPIRE_CODEX_BASE_URL}${card.image_url}`;
};

export default function SortCards({ cards, onSelect}) {
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
      <button onClick={sortByCost} style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
      Sort by Cost</button>
      <button onClick={sortByName} style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
      Sort by Name</button>

      <div className="card-grid">
        {sortedCards.map((card) => {
          const imageUrl = getCardImageUrl(card);
          
          return (
            <div
              key={card.id}
              className="card"
            onClick={() => onSelect && onSelect(card)}
            style={{ cursor: "pointer" }}
          >
            <h3>{card.name}</h3>

            {imageUrl && (
          <img
            src={imageUrl}
            alt={card.name}
            className="card-image"
          />
        )}

            <p>Cost: {card.cost}</p>
            <p>Type: {card.type}</p>
            <p>Rarity: {card.rarity}</p>
            <p>Damage: {card.damage}</p>
            <p>Block: {card.block}</p>
            <p>Magic: {card.magic}</p>
            <p>Description: {card.description}</p>
          </div>
         );
        })}
      </div>
    </div>
  );
}
  
