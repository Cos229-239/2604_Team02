import cards from "../data/cards2.json";
export default function Cards2() {
  

  return (
  <div>
    <div style={{ marginTop: '16px' }}>
      {cards
        .slice() // avoid mutating original array
        .sort((a, b) => {
          // sort by cost first
          if (a.cost !== b.cost) {
            return a.cost - b.cost;
          }
          // if cost is equal, sort by name
          return a.name.localeCompare(b.name);
        })
        .map((card) => (
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