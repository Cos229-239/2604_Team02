import { useState } from "react";
import cards from "../../data/cards2.json";
import SortCards from "../../data/sorter-fixes/card-sorter";
import DataHelper from "../../data/sorter-fixes/runDataHelper";
import { getMainArchetype, getRecommendedCard } from "./recommendationSystem";
import CardRewards from "./cardRewards";
import { getStarterDeck } from "./starterDeck";
import CharacterSelect from "./characterSelect";
import RunAssistant from "./RunAssistant";




function SavedRunView({ slot, loadRun, goBack }) {
  const data = localStorage.getItem(slot);

  if (!data) {
    return (
      <div>
        <h2>No saved run in this slot.</h2>
        <button
          onClick={goBack}
          style={{ color: "black", backgroundColor: "#ddd", marginTop: "10px" }}
        >
          Back
        </button>
      </div>
    );
  }

  const saved = JSON.parse(data);

  return (
    <div>
      <h2>Saved Run ({slot})</h2>

      <h3>Character: {saved.character}</h3>

      <h3>Deck:</h3>
      {saved.deck.map((card, index) => (
        <div key={index}>{card.name}</div>
      ))}

      <h3>Choices:</h3>
      {saved.choices.map((card, index) => (
        <div key={index}>{card.name}</div>
      ))}

      <button
        onClick={() => loadRun(saved)}
        style={{ color: "black", backgroundColor: "#ddd", marginTop: "10px", marginRight: "10px" }}
      >
        Load This Run
      </button>

      <button
        onClick={goBack}
        style={{ color: "black", backgroundColor: "#ddd", marginTop: "10px" }}
      >
        Back
      </button>
    </div>
  );
}

export default function RewardChooser() {
  const[view, setView] = useState("Run");
  const [deck, setDeck] = useState([]);
  const [choices, setChoices] = useState([]);
  const [character, setCharacter] = useState("");
  const [sortedCards, setSortedCards] = useState(cards);

  const mainArchetype = getMainArchetype(deck, character, getStarterDeck);

  const recommendedCard = getRecommendedCard(choices, mainArchetype, character);

  const cardGroups = {
    Attack: [],
    Skill: [],
    Power: [],
    Curse: [],
  }
  const loadRun = (saved) => {
  setCharacter(saved.character);
  setDeck(saved.deck);
  setChoices(saved.choices);
  setView("Run");
};

  cards.forEach(card=> {
    if (cardGroups[card.type]){
      cardGroups[card.type].push(card);
    }
  });


  return (
    <div className="run-page">
    <section className="run-card">
      <h3>Save / Load Run</h3>


    <section className="run-button-row">
<button
  onClick={() => {
    const runData = { character, deck, choices };
    localStorage.setItem("savedRun1", JSON.stringify(runData));
    alert("Saved to Slot 1!");
  }}
  style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px" }}
>
  
  Save Slot 1
</button>

<button
  onClick={() => {
    const runData = { character, deck, choices };
    localStorage.setItem("savedRun2", JSON.stringify(runData));
    alert("Saved to Slot 2!");
  }}
  style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px" }}
>
  Save Slot 2
</button>

<button
  onClick={() => {
    const runData = { character, deck, choices };
    localStorage.setItem("savedRun3", JSON.stringify(runData));
    alert("Saved to Slot 3!");
  }}
  style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px" }}
>
  Save Slot 3
</button>
<button
  onClick={() => setView("Load Slot 1")}
  style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px" }}
>
  Load Slot 1
</button>

<button
  onClick={() => setView("Load Slot 2")}
  style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px" }}
>
  Load Slot 2
</button>

<button
  onClick={() => setView("Load Slot 3")}
  style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px" }}
>
  Load Slot 3
</button>
    </section>
</section>

 {/* If no character is selected, show message to select character -Chris */}
{character !== "" && (
  <>
    <h2>Statistics</h2>
    <DataHelper
      character={character}
      deck={deck}
      choices={choices}
      cardGroups={cardGroups}
      
    />
  </>
)}

      <h2>Current Run</h2>
          {character && (
        <button
        onClick={()=> {
          setCharacter("")
          setDeck([])
          setChoices([])
          setView("Run")
        }}
        style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
          Reset Run
        </button>
      )}
      {character && <h3>Character: {character}</h3>}
  
{view === "Run" && (
  <>
  
   {character !== "" &&(
      <>
      <button onClick={() =>setView("Add Cards")}
  style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
    Add Cards
  </button>
      <button onClick={()=> setView("Remove Cards")}
      style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
        Remove Card From Deck
      </button>
  <button onClick={() =>setView("Card Rewards")}
  style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
    Choose Card Reward
  </button>
</>
    )}
{character === "" && (<CharacterSelect setCharacter = {setCharacter}
setDeck={setDeck}
setChoices ={setChoices}
setView={setView}
getStarterDeck={getStarterDeck}
/>)}
{character !== "" &&(
  <>
      <h3>Save Current Run</h3>

<button
  onClick={() => {
    const runData = {
      character,
      deck,
      choices
    };
    localStorage.setItem("savedRun", JSON.stringify(runData));
    alert("Run saved!");
  }}
  style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px" }}
>
  Save Current Run
</button>   

      <h3>Current Deck</h3>

<div className="deck-summary">
  {Object.entries(
    deck.reduce((counts, card) => {
      counts[card.name] = (counts[card.name] || 0) + 1;
      return counts;
    }, {})
  ).map(([cardName, count]) => (
    <div className="deck-summary-row" key={cardName}>
      <span>{cardName}</span>
      <span>x{count}</span>
    </div>
  ))}
</div>

<p>Deck size: {deck.length}</p>
    </>
      )}
  </>
    )}
{view === "Card Rewards" && ( 
  <CardRewards
  choices={choices}
  setChoices={setChoices}
    deck={deck}
    setDeck={setDeck}
    cardGroups={cardGroups}
    setView={setView}
    mainArchetype={mainArchetype}
    recommendedCard={recommendedCard}
  />
)}

{view === "Add Cards" && (
<>
 <button onClick={()=>setView("Run")}
        style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
        Back to Run
        </button>

        <h3>Add Cards</h3>

{["Attack","Skill","Power","Curse"].map(type =>(
        <div key={type}>
      <h4>{type}</h4>
      <SortCards
         cards={cardGroups[type]}
         onSelect={(card) => setDeck([...deck, card])}
      />
        </div>
      ))}
</>
)}
    

{view === "Remove Cards" && (
<>
 <button onClick={()=>setView("Run")}
        style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
        Back to Run
        </button>

        <h3>Remove Cards</h3>

        {deck.map((card,index)=>(
          <button
          key = {index}
          onClick={()=>{
            const newDeck = [...deck];
            newDeck.splice(index,1);
            setDeck(newDeck);
          }}
          style = {{
            color:"black", backgroundColor:"#867e7e",marginRight: "10px"
          }}
          >
            Remove {card.name}
          </button>
        ))

        }
</>
)}
{view === "Saved Run" && (
  <div>
    <h2>Saved Run</h2>

    {(() => {
      const data = localStorage.getItem("savedRun");
      if (!data) return <p>No saved run found.</p>;

      const saved = JSON.parse(data);

      return (
        <>
          <h3>Character: {saved.character}</h3>

          <h3>Deck:</h3>
          {saved.deck.map((card, index) => (
            <div key={index}>{card.name}</div>
          ))}

          <h3>Choices:</h3>
          {saved.choices.map((card, index) => (
            <div key={index}>{card.name}</div>
          ))}

          <button
            onClick={() => setView("Run")}
            style={{ color: "black", backgroundColor: "#ddd", marginTop: "10px" }}
          >
            Back to Run
          </button>
        </>
      );
    })()}
  </div>
)}
{view === "Load Slot 1" && (
  <SavedRunView
    slot="savedRun1"
    loadRun={loadRun}
    goBack={() => setView("Run")}
  />
)}

{view === "Load Slot 2" && (
  <SavedRunView
    slot="savedRun2"
    loadRun={loadRun}
    goBack={() => setView("Run")}
  />
)}

{view === "Load Slot 3" && (
  <SavedRunView
    slot="savedRun3"
    loadRun={loadRun}
    goBack={() => setView("Run")}
  />
)}

{/* Run Assistant Card */}

{character !=="" && view === "Run" && (
    <RunAssistant character={character} />
)}
    
  </div>
  )
  
}