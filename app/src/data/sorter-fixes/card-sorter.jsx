import { useState, useEffect } from 'react';

const SPIRE_CODEX_BASE_URL = "https://beta.spire-codex.com";

const getCardImageUrl = (card) => {
  if (!card.image_url) {
    return null;
  }
  return `${SPIRE_CODEX_BASE_URL}${card.image_url}`;
};

const cleanDescription = (text) => {
  if (!text) {
    return "";
  }

  return text
  .replace(/\[\/?[a-zA-Z]+\]/g, "")
  .replace(/\[energy:(\d+)\]/g, "$1 Energy")
  .replace(/\[star:(\d+)\]/g, "$1 Star");
};

export default function SortCards({ cards, onSelect}) {
  const [sortedCards, setSortedCards] = useState([  ]);

  const [searchTerm, setSearchTerm] = useState("");
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
  
  const filterCards = sortedCards.filter((card)=>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input 
      type ="text"
      placeholder="Search cards"
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
      style={{padding: "8px", marginBottom:"10px", marginRight:"10px"}}
      />

      <button onClick={sortByCost} style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
      Sort by Cost</button>
      <button onClick={sortByName} style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
      Sort by Name</button>

      <div className="card-grid">
        {filterCards.map((card) => {
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
            {card.damage !== null && card.damage !== undefined && (
              <p>Damage: {card.damage}</p>
            )}
            {card.block !== null && card.block !== undefined && (
              <p>Block: {card.block}</p>
            )}
              {card.magic !== null && card.magic !== undefined && (
              <p>Magic: {card.magic}</p>
            )}
            <p>Description: {cleanDescription(card.description)}</p>
          </div>
         );
        })}
      </div>
    </div>
  );
}
  
