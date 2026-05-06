import cards from "../data/cards2.json";
import SortCards from "../data/sorter-fixes/card-sorter";


export default function Cards2() {
  

  return (
    <div className="cards-section">
      <h1>Card Sorter</h1>
      <p>Sort cards by different attributes</p>
      <SortCards cards={cards} />
    </div>
  );


}