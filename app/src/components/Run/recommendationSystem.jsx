
export function getMainArchetype(deck,character,getStarterDeck){

const archetypes = {
  //Ironclad Archetypes
  strength: 0,
  exhaust: 0,
  block: 0,
  
  // Silent Archetypes
  poison: 0,
  shiv: 0,
  sly: 0,

  //Regent Archetypes
  starCost: 0,
  sovereignBlade: 0,
  createdCards: 0,

  //Necrobinder Archetypes
  soul: 0,
  osty: 0,
  doom: 0,

  //Defect Archetypes
  orbs: 0,
  zeroCost: 0,
  status: 0
  };
  const starterDeckSize = getStarterDeck(character).length;
  const pickedCards = deck.slice(starterDeckSize);

  
  pickedCards.forEach((card) => {
    const text = (card.description + " " + card.name).toLowerCase();
  if(character==="Ironclad"){
    if (text.includes("strength")){
      archetypes.strength += 1;
    }
     if (text.includes("exhaust")){
      archetypes.exhaust += 1;
    }
      if (text.includes("block")){
      archetypes.block += 1;
    }
  }
  if(character==="Silent"){
     if (text.includes("poison")){
      archetypes.poison += 1;
    }
      if (text.includes("shiv")){
      archetypes.shiv += 1;
    }
     if (text.includes("sly")||
    text.includes("discard")){
      archetypes.sly += 1;
    }
  }
  if(character==="Necrobinder"){
     if (text.includes("soul")){
      archetypes.soul += 1;
    }
     if (text.includes("osty")){
      archetypes.osty += 1;
    }
     if (text.includes("doom")){
      archetypes.doom += 1;
    }
  }
  if(character==="Regent"){
    if (card.star_cost !== null){
      archetypes.starCost += 1;
    }
    if (text.includes("sovereign blade")){
      archetypes.sovereignBlade += 1;
    }
    if (text.includes("create")||
    text.includes("created")){
      archetypes.createdCards += 1;
    }
  }
  if(character==="Defect"){
       if (text.includes("orb") || 
      text.includes("channel")){
      archetypes.orbs += 1;
    }
     if (card.cost === 0){
      archetypes.zeroCost += 1;
    }
      if (text.includes("status") ||
      text.includes("burn") ||
      text.includes("dazed") ||
      text.includes("wound") ||
      text.includes("void")
    ){
      archetypes.status += 1;
    }
  }
  })
    
   let mainArchetype = "";
   let highestValue = 0;
  
   for (const type in archetypes){
    if (archetypes[type]>highestValue){
      highestValue = archetypes[type];
      mainArchetype = type;
    }
   }
   return mainArchetype;
}

export function getCardScore(card, mainArchetype, character){
    let score = 0;
    const text = (card.description + " " + card.name).toLowerCase();
     if(character==="Ironclad"){
    if (mainArchetype === "strength"){
      if(text.includes("strength")){score += 10;}
      if(card.type==="Attack"){score += 3;}
    }
     if (mainArchetype === "exhaust"){
      if(text.includes("exhaust")){score += 10;}
    }
      if (mainArchetype === "block"){
      if(text.includes("block")){score += 10;}
    }
  }
  if(character==="Silent"){
     if (mainArchetype === "poison"){
      if(text.includes("poison")){score += 10;}
    }
      if (mainArchetype === "shiv"){
      if(text.includes("shiv")||(card.name === "Finisher"||card.name === "Strangle")){score += 10;}
      if(text.includes("vulnerable")){score += 3;}
      if(card.cost === 0){score += 2;}
     
    }
     if (mainArchetype === "sly"){
      if(text.includes("sly")||text.includes("discard")){score += 10;}
    }
  }
  if(character==="Necrobinder"){
     if (mainArchetype === "soul"){
      if(text.includes("soul")||card.name === "Death March"){score += 10;}
    }
     if (mainArchetype === "osty"){
      if(text.includes("osty")||text.includes("summon")){score += 10;}
    }
     if (mainArchetype === "doom"){
      if(text.includes("doom")){score += 10;}
      if(card.name === "Sleight of Flesh"){score += 5;}
    }
  }
  if(character==="Regent"){
    if (mainArchetype === "starCost"){
      if(card.star_cost !== null){score += 10;}
    }
    if (mainArchetype === "sovereignBlade"){
      if(text.includes("sovereign blade")||text.includes("forge")){score += 10;}
    }
    if (mainArchetype === "createdCards"){
      if(text.includes("create")||text.includes("created")){score += 10;}
      if(text.includes("transform")){score += 5;}
    }
  }
  if(character==="Defect"){
       if (mainArchetype === "orbs"){
      if(text.includes("channel")||text.includes("focus")||text.includes("evoke")){score += 10;}
    }
     if (mainArchetype === "zeroCost"){
      if(card.cost === 0 || text.includes("0[energy")){score += 10;} 
    }
      if (mainArchetype === "status"){
      if (text.includes("status") ||
      text.includes("burn") ||
      text.includes("dazed") ||
      text.includes("wound") ||
      text.includes("void")){score += 10;}
    }
  }
  
  if (score === 0){
    score = 1;
  }
    return score;
}

export function getRecommendedCard(choices, mainArchetype, character){
    let recommendedCard = null;
    let bestScore = -1;

    choices.forEach((card)=> {
        const score = getCardScore(card, mainArchetype, character);
        if (score > bestScore){
            bestScore = score;
            recommendedCard = card;
        }
    });
    return recommendedCard;
}