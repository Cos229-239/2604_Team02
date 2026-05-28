import Statistics from "./statistics";

export default function DataHelper({ character, deck, choices }) {
  if (!character) {
    return <p>Select a character to begin tracking statistics.</p>;
  }

  return (
    <div className="run-tracker-card">
      <h3>Run Tracker</h3>

      <div className="run-tracker-summary">
      <p>Character: {character}</p>
      <p>Deck Size: {deck.length}</p>
      <p>Current Reward Choices: {choices.length}</p>
      </div>

      <Statistics
        currentCharacter={character}
        currentDeck={deck}
        currentChoices={choices}
      />
    </div>
  );
}