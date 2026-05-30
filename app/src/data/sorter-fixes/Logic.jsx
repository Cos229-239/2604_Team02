import { useState, useEffect } from "react";
import cards from "./cards2.json";
import SortCards from "./sorter-fixes/card-sorter";
import Run from "../components/Run";
import Monster from "../components/data/monsters.json";
import Relic from "../components/data/relics.json";
import Character from "../components/data/characters.json";
import enhancements from "../components/data/enhancements.json";
import encounters from "../components/data/encounters.json";
import afflictions from "../components/data/afflictions.json";
import potions from "../components/data/potions.json";
import intents from "../components/data/intents.json";
import powers from "../components/data/powers.json";
import keywords from "../components/data/keywords.json";
import assistant from "../components/data/assistant.json";
import resets from "../components/data/resets.json";
import Statistics from "./statistics";




export default function Logic() {
  const[view, setView] = useState("Run");
  const [deck, setDeck] = useState([]);
  const [choices, setChoices] = useState([]);
  const [character, setCharacter] = useState("");
  const [sortedCards, setSortedCards] = useState(cards);
  const [monsters, setMonsters] = useState(Monster);
  const [relics, setRelics] = useState(Relic);
  const [characters, setCharacters] = useState(Character);
  const [enhancementList, setEnhancements] = useState(enhancements);
  const [encounterList, setEncounters] = useState(encounters);
  const [afflictionList, setAfflictions] = useState(afflictions);
  const [potionList, setPotions] = useState(potions);
  const [intentList, setIntents] = useState(intents);
  const [powerList, setPowers] = useState(powers);
  const [keywordList, setKeywords] = useState(keywords);
  const [assistantData, setAssistantData] = useState(assistant);
  const [resetData, setResetData] = useState(resets);
  const [statsView, setStatsView] = useState("Run");


  const cardGroups = {
    Attack: [],
    Skill: [],
    Power: [],
    Curse: [],
  }
  
  cards.forEach(card=> {
    if (cardGroups[card.type]){
      cardGroups[card.type].push(card);
    }
  });

  monsters.forEach(monster => {
    monster.intents = intentList.filter(intent => intent.monsterId === monster.id);
  });

  characters.forEach(char => {
    char.startingDeck = cards.filter(card => char.startingDeck.includes(card.id));
    char.startingRelics = relics.filter(relic => char.startingRelics.includes(relic.id));
  });

  relics.forEach(relic => {
    relic.enhancements = enhancementList.filter(enh => enh.relicId === relic.id);
  });
  encounterList.forEach(encounter => {
    encounter.monsters = monsters.filter(monster => encounter.monsterIds.includes(monster.id));
  });

  afflictionList.forEach(affliction => {
    affliction.encounters = encounterList.filter(encounter => affliction.encounterIds.includes(encounter.id));
  });

  potionList.forEach(potion => {
    potion.effects = enhancementList.filter(enh => potion.effectIds.includes(enh.id));
  });

  powerList.forEach(power => {
    power.effects = enhancementList.filter(enh => power.effectIds.includes(enh.id));
  });

  keywordList.forEach(keyword => {
    keyword.cards = cards.filter(card => card.description.includes(keyword.name));
  });

  return (
    <div>
      <h1>Data Logic</h1>
      <p>This page is for testing data logic and relationships.</p>

        <h2>Characters</h2>
        {characters.map(char => (
          <div key={char.id}>
            <h3>{char.name}</h3>
            <p>Starting Deck:</p>
            <ul>
              {char.startingDeck.map(card => (
                <li key={card.id}>{card.name}</li>
              ))}
            </ul>
          </div>
        ))}
        <h3>Relics</h3>
        {relics.map(relic => (
          <div key={relic.id}>
            <h4>{relic.name}</h4>
            <p>Enhancements:</p>
            <ul>
              {relic.enhancements.map(enh => (
                <li key={enh.id}>{enh.name}</li>
              ))}
            </ul>
          </div>
        ))}
        <h4>Monsters and Intents</h4>
        {monsters.map(monster => (
          <div key={monster.id}>
            <h4>{monster.name}</h4>
            <p>Intents:</p>
            <ul>
              {monster.intents.map(intent => (
                <li key={intent.id}>{intent.name}</li>
              ))}
            </ul>
          </div>
        ))}
        <h5>Afflictions and Encounters</h5>
        {afflictionList.map(affliction => (
          <div key={affliction.id}>
            <h5>{affliction.name}</h5>
            <p>Encounters:</p>
            <ul>
              {affliction.encounters.map(encounter => (
                <li key={encounter.id}>{encounter.name}</li>
              ))}
            </ul>
          </div>
        ))}
        <h6>Potions and Effects</h6>
        {potionList.map(potion => (
          <div key={potion.id}>
            <h6>{potion.name}</h6>
            <p>Effects:</p>
            <ul>
              {potion.effects.map(enh => (
                <li key={enh.id}>{enh.name}</li>
              ))}
            </ul>
          </div>
        ))}
        <h6>Powers and Effects</h6>
        {powerList.map(power => (
          <div key={power.id}>
            <h6>{power.name}</h6>
            <p>Effects:</p>
            <ul>
              {power.effects.map(enh => (
                <li key={enh.id}>{enh.name}</li>
              ))}
            </ul>
          </div>
        ))}
        <h6>Keywords and Cards</h6>
        {keywordList.map(keyword => (
          <div key={keyword.id}>
            <h6>{keyword.name}</h6>
            <p>Cards with this keyword:</p>
            <ul>
              {keyword.cards.map(card => (
                <li key={card.id}>{card.name}</li>
              ))}
            </ul>
          </div>
        ))}
        <h7>Card Groups</h7>
        {Object.keys(cardGroups).map(type => (
          <div key={type}>
            <h7>{type}</h7>
            <ul>
              {cardGroups[type].map(card => (
                <li key={card.id}>{card.name}</li>
              ))}
            </ul>
          </div>
        ))}
        <h8>Deck Builder</h8>
        <SortCards
          cards={cards}
          onSelect={(card) => setDeck([...deck, card])}
        />
        <h3>Current Deck:</h3>
        {deck.map((card,index)=>(
          <div key={index}>{card.name}</div>
        ))}
        <p>Deck size: {deck.length}</p>
        <h5>monster now:</h5>
        {monsters.map(monster => (
          <div key={monster.id}>
            <h4>{monster.name}</h4>
            <p>Intents:</p>
            <ul>
              {monster.intents.map(intent => (
                <li key={intent.id}>{intent.name}</li>
              ))}
            </ul>
          </div>
        ))}
          <h5>Relic now:</h5>
        {relics.map(relic => (
          <div key={relic.id}>
            <h4>{relic.name}</h4>
            <p>Enhancements:</p>
            <ul>
              {relic.enhancements.map(enh => (
                <li key={enh.id}>{enh.name}</li>
              ))}
            </ul>
          </div>
        ))}
        <h3>deck style and suggestions</h3>
        {deck.length > 0 && (
          <div>
            <p>Deck contains {deck.length} cards.</p>
            <p>Based on the cards in your deck, you might want to consider adding:</p>
            <ul>
              {deck.some(card => card.name.includes("Strike")) && <li>Defend cards to complement your Strikes.</li>}
              {deck.some(card => card.name.includes("Defend")) && <li>Attack cards to complement your Defends.</li>}
              {deck.some(card => card.name.includes("Power")) && <li>Cards that synergize with Powers.</li>}
              {deck.some(card => card.rarity === "Rare") && <li>Other Rare cards for powerful combos.</li>}
            </ul>
          </div>
        )}
        <h6>keyword test</h6>
        {keywordList.map(keyword => (
          <div key={keyword.id}>
            <h6>{keyword.name}</h6>
            <p>Cards with this keyword:</p>
            <ul>
              {keyword.cards.map(card => (
                <li key={card.id}>{card.name}</li>
              ))}
            </ul>
          </div>
        ))}
        <h3>Deck Builder card removal</h3>
        <SortCards
          cards={cards}
          onSelect={(card) => setDeck(deck.filter(c => c.id !== card.id))}
        />
        <h3>Current Deck:</h3>
        {deck.map((card,index)=>(
          <div key={index}>{card.name}</div>
        ))}
        <p>Deck size: {deck.length}</p>

        <h2>Card Rewards with suggestions based on your deck</h2>
        {["Attack","Skill","Power","Curse"].map(type =>(
        <div key={type}>
      <h4>{type}</h4>
      <SortCards
         cards={cardGroups[type]}
         onSelect={(card) => {
            if (choices.length < 3) {
              setChoices([...choices, card]);
            }
          }}
      />
        </div>
      ))}
      <h3>Selected Cards:</h3>
      {choices.map((c,index)=>(
      <div key={index}>{c.name}</div>
      ))}
      <button onClick={()=>setChoices([])}
        style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
        Reset Choices 
        </button>
      <h3>Suggestions based on your current deck:</h3>
      <ul>
        {choices.some(card => card.name.includes("Strike")) && <li>Consider picking Defend cards to complement your Strikes.</li>}
        {choices.some(card => card.name.includes("Defend")) && <li>Consider picking Attack cards to complement your Defends.</li>}
        {choices.some(card => card.name.includes("Power")) && <li>Consider picking cards that synergize with Powers.</li>}
        {choices.some(card => card.rarity === "Rare") && <li>Consider picking other Rare cards for powerful combos.</li>}
      </ul>
      <h2>Statistics</h2>
      <Statistics deck={deck} choices={choices} />
      <h2>Assistant</h2>
      <div className="assistant-container">
        <div className="assistant-response">
          <p>{assistantData.response}</p>
        </div>
        <div className="assistant-input">
          <input
            type="text"
            value={assistantData.input}
            onChange={(e) => setAssistantData({ ...assistantData, input: e.target.value })}
            placeholder="Ask the assistant..."
            className="assistant-input-field"
          />
          <button
            onClick={() => {
              // Simulate assistant response based on input
              let response = "I'm not sure how to respond to that.";
              if (assistantData.input.toLowerCase().includes("suggest a card")) {
                response = "Based on your current deck, I suggest adding more Defend cards to complement your Strikes.";
              }
              setAssistantData({ ...assistantData, response });
            }}
            className="assistant-input-button"
          >
            Ask
          </button>
        </div>
      </div>
      <h2>Reset Data</h2>
      <button
        onClick={() => {  
          setDeck([]);
          setChoices([]);
          setCharacter("");
          setSortedCards(cards);
          setMonsters(Monster);
          setRelics(Relic);
          setCharacters(Character);
          setEnhancements(enhancements);
          setEncounters(encounters);
          setAfflictions(afflictions);
          setPotions(potions);
          setIntents(intents);
          setPowers(powers);
          setKeywords(keywords);
          setAssistantData(assistant);
        }}
        style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px" }}
      >
        Reset All Data
      </button>
    </div>
  );
}