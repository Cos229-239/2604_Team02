import Statistics from "./statistics";

export default function DataHelper({ character, deck, choices }) {
  if (!character) {
    return <p>Select a character to begin tracking statistics.</p>;
  }

  return (
    <div>
      <h3>Run Tracker</h3>

      <p>Character: {character}</p>
      <p>Deck Size: {deck.length}</p>
      <p>Current Reward Choices: {choices.length}</p>

      <Statistics
        currentCharacter={character}
        currentDeck={deck}
        currentChoices={choices}
      />
    </div>
  );
}