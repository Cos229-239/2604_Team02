import cards from "../../data/cards2.json";

// *Starter Deck Helper Functions* -Chris

const getCardsByName = (cardName, amount) => {
  const card = cards.find((card) => card.name === cardName);

  if (!card) {
    console.log(`Card not found: ${cardName}`);
    return [];
  }

  return Array(amount).fill(card);
};

const getStarterDeck = (characterName) => {
  if (characterName === "Ironclad") {
    return [
      ...getCardsByName("Strike", 5),
      ...getCardsByName("Defend", 4),
      ...getCardsByName("Bash", 1),
    ];
  }

  if (characterName === "Silent") {
    return [
      ...getCardsByName("Strike", 5),
      ...getCardsByName("Defend", 5),
      ...getCardsByName("Survivor", 1),
      ...getCardsByName("Neutralize", 1),
    ];
  }

  if (characterName === "Defect") {
    return [
      ...getCardsByName("Strike", 4),
      ...getCardsByName("Defend", 4),
      ...getCardsByName("Zap", 1),
      ...getCardsByName("Dualcast", 1),
    ];
  }

  if (characterName === "Necrobinder") {
    return [
      ...getCardsByName("Strike", 4),
      ...getCardsByName("Defend", 4),
      ...getCardsByName("Bodyguard", 1),
      ...getCardsByName("Unleash", 1),
    ];
  }

  if (characterName === "Regent") {
    return [
      ...getCardsByName("Strike", 4),
      ...getCardsByName("Defend", 4),
      ...getCardsByName("Falling Star", 1),
      ...getCardsByName("Venerate", 1),
    ];
  }

  return [];
};
export {getStarterDeck};