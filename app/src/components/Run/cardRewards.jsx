import SortCards from "../../data/sorter-fixes/card-sorter";

export default function CardRewards({choices, setChoices,deck,setDeck,cardGroups,setView,mainArchetype,recommendedCard}){
return(
      <>
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

       <h3>Current Archetype: {mainArchetype}</h3>

          {recommendedCard && (<h2>Recommended Pick: {recommendedCard.name}</h2>)}

      <h3>Select the 3 cards</h3>

     
      <SortCards
        cards={cardGroups[type]}
        onSelect={(card) => {
         setDeck([...deck,card]);
         setChoices([]);
         setView("Run");
        }}
      />
        
</>
);
}