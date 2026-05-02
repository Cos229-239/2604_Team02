import { useState, useEffect } from 'react';

export default function SortCards({ cards }) {
  const [sortedCards, setSortedCards] = useState([  ]);

  // Sort once when the page loads
  useEffect(() => {
    const initial = [...cards].sort((a, b) => a.cost - b.cost);
    setSortedCards(initial);
  }, [cards]);

  const sortByCost = () => {
    setSortedCards([...sortedCards].sort((a, b) => a.cost - b.cost));
  };

  const sortByName = () => {
    setSortedCards([...sortedCards].sort((a, b) => a.name.localeCompare(b.name)));
  };


  
}