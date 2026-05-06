import { useState } from "react";
import cards from "../data/cards2.json";

export default function RewardChooser() {
  const[view, setView] = useState("Run");
  const [deck, setDeck] = useState([]);
  const [choices, setChoices] = useState([]);

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

  return (
    <div>
      <h2>Current Run</h2>
{view === "Run" && (
  <>
  <button onClick={() =>setView("Card Rewards")}
  style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
    Choose Card Reward
  </button>
      <h3>Build Your Deck</h3>
      {["Attack","Skill","Power","Curse"].map(type =>(
        <div key={type}>
      <h4>{type}</h4>
      {cardGroups[type].slice(0,5).map(card => (
        <button key={card.id} 
        onClick={() => setDeck([...deck, card])}
        style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
          {card.name}
        </button>
      ))}
        </div>
      ))}
      
      <p>Deck size: {deck.length}</p>

      <h4> Your Deck:</h4>
      {deck.map((c,index)=>(
        <div key = {index}>{c.name}</div>
      ))}
    </>
      )}

      {view === "Card Rewards" &&(<>
      <button onClick={()=>setView("Run")}
        style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
        Back to Run
        </button>
      <h3>Selected Cards:</h3>
      {choices.map((c,index)=>(
      <div key={index}>{c.name}</div>
      ))}
      <button onClick={()=>setChoices([])}
        style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
        Reset Choices 
        </button>
      

      <h3>Select the 3 cards</h3>
      {["Attack","Skill","Power","Curse"].map(type =>(
      <div key={type}>
      <h4>{type}</h4>
      {cardGroups[type].slice(0,5).map(card => (
        <button key={card.id} 
        onClick={() => {
          if (choices.length <3){
            setChoices([...choices,card]);
          }
        }}
        style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
          {card.name}
        </button>
      ))}
        </div>
      ))}
 

</>)}
    </div>
  )
}