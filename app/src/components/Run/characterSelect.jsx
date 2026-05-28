
      export default function CharacterSelect({setCharacter, setDeck, setChoices, setView, getStarterDeck}){
      return (
      <>
      <h3>Select Your Character</h3>

      {["Ironclad","Silent","Defect","Necrobinder","Regent"].map((char) => (
        <button
        key={char}
        onClick={()=>{
        setCharacter(char);
        setDeck(getStarterDeck(char));
        setChoices([]);
        setView("Run");
      }}
        style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px"}}>
        {char}
        </button>
      ))}
</>
);
}