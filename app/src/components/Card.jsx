function Card({ card }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <strong>{card.name}</strong> ({card.type}) - Cost: {card.cost}
      <br />
      <span>{card.description}</span>
    </div>
  );
}

export default Card;