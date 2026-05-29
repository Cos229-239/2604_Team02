


export const getPathRecommendation = ({
  healthStatus,
  runGoal,
  pathType,
  selectedAct,
}) => {
  if (healthStatus === "critical") {
    return "You are low on health. Prioritize event paths, rest sites, shops, or defensive card choices before taking major risks.";
  }

  if (selectedAct === "Act 1" && pathType === "elite" && healthStatus === "healthy") {
    return "Act 1 elite paths can be valuable if you have enough HP, damage, and potion support. Early relics can help your run scale faster.";
  }

  if (selectedAct === "Act 1" && pathType === "elite" && healthStatus === "injured") {
    return "An Act 1 elite while injured is risky. Make sure your deck has strong frontloaded damage before committing.";
  }

  if (selectedAct === "Act 2" && pathType === "elite") {
    return "Act 2 elites can punish weak defense and slow setup. Consider this path only if your deck has reliable block, scaling, or strong potion support.";
  }

  if (selectedAct === "Act 3" && pathType === "elite") {
    return "Act 3 elite paths are usually better when your deck is already stable. If your deck still needs upgrades or healing, choose a safer route.";
  }

  if (pathType === "shop") {
    return "A shop path is useful if you need card removal, relic support, or potion help before a harder fight.";
  }

  if (pathType === "rest") {
    return "A rest site path is useful when your HP is low or when you have an important card upgrade that improves your next fight.";
  }

  if (runGoal === "offense") {
    return "Focus on improving damage output. Look for strong attacks, scaling damage, or cards that help finish fights faster.";
  }

  if (runGoal === "defense") {
    return "Focus on survival. Prioritize block cards, sustain options, and choices that reduce damage taken over time.";
  }

  if (runGoal === "upgrades") {
    return "Look for paths with campfires when possible. Upgrading key cards can be stronger than adding too many new cards.";
  }

  return "Balanced route recommended. Take manageable fights, improve your deck gradually, and avoid unnecessary risk unless your deck is strong.";
};