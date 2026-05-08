import { useState } from "react";
import cards from "../data/cards2.json";
import SortCards from "../data/sorter-fixes/card-sorter";

export default function RewardChooser() {
  const[view, setView] = useState("Run");
  const [deck, setDeck] = useState([]);
  const [choices, setChoices] = useState([]);
  const [character, setCharacter] = useState("");
  const [sortedCards, setSortedCards] = useState(cards);

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
      {character && <h3>Character: {character}</h3>}
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
{view === "Run" && (
  <>
  
   {character !== "" &&(
      <>
      <button
      onClick={()=> setView("Remove Cards")}
      style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
        Remove Card From Deck

      </button>
  <button onClick={() =>setView("Card Rewards")}
  style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
    Choose Card Reward
  </button>
</>
    )}
    {character === "" && (
      <>
      <h3>Select Your Character</h3>

      {["Ironclad","Silent","Defect","Necrobinder","Regent"].map(char => (
        <button
        key={char}
        onClick={()=>setCharacter(char)}
        style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
        {char}
        </button>
      ))}
</>
)}
{character !== "" &&(
  <>
      <h3>Build Your Deck</h3>
      {["Attack","Skill","Power","Curse"].map(type =>(
        <div key={type}>
      <h4>{type}</h4>
      <SortCards
         cards={cardGroups[type]}
         onSelect={(card) => setDeck([...deck, card])}
      />
        </div>
      ))}
      
      <p>Deck size: {deck.length}</p>

      <h4> Your Deck:</h4>
      {deck.map((c,index)=>(
        <div key = {index}>{c.name}</div>
      ))}
    </>
      )}
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
 

</>)}

{view == "Remove Cards" && (
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
    </div>
  
  )
}