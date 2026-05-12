
import { useState } from "react";

import monsters from "../data/monsters.json";

function Monsters() {

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedType, setSelectedType] = useState("All");

  const filteredMonsters = monsters.filter((monster) => {
    const matchesSearch = monster.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType = selectedType === "All" || monster.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
  <>
    {/* Controls section for searching and filtering monsters */}
    <div className="monster-controls">
      {/* Every time the user types, update searchTerm with the new input value. */}
      <input
        type="text"
        placeholder="Search monsters..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {/* Every time the user changes the dropdown, update selectedType. */}
      <select
        value={selectedType}
        onChange={(event) => setSelectedType(event.target.value)}
      >
        <option value="All">All Types</option>
        <option value="Normal">Normal</option>
        <option value="Elite">Elite</option>
        <option value="Boss">Boss</option>
      </select>
    </div>

    {/* Shows the user how many monsters are currently visible */}
    <p className="monster-count">
      Showing {filteredMonsters.length} of {monsters.length} monsters
    </p>

    <div className="monster-grid">
      {filteredMonsters.map((monster) => (
        <div className="enemy-card" key={monster.id}>
          <h3>{monster.name}</h3>
          {monster.image_url && (
            <img
              src={monster.image_url}
              alt={monster.name}
              className="monster-image"
            />
          )}

          <p>
            <strong>Type:</strong> {monster.type}
          </p>

          <p>
            <strong>HP:</strong> {monster.min_hp}
            {monster.max_hp ? ` - ${monster.max_hp}` : ""}
          </p>

          <p>
            <strong>Ascension HP:</strong> {monster.min_hp_ascension}
            {monster.max_hp_ascension ? ` - ${monster.max_hp_ascension}` : ""}
          </p>

          {monster.encounters && monster.encounters.length > 0 && (
            <p>
              <strong>Act:</strong> {monster.encounters[0].act}
            </p>
          )}

          {monster.attack_pattern && (
            <p>
              <strong>Pattern:</strong> {monster.attack_pattern.description}
              {monster.attack_pattern?.description || "Pattern data not available yet."}
            </p>
          )}

            {monster.innate_powers && monster.innate_powers.length > 0 && (
            <div className="monster-section">
              <h4>Innate Powers</h4>

              <ul>
                {monster.innate_powers.map((power) => (
                  <li key={power.id}>
                    <strong>{power.name}:</strong> {power.description}
                      {power.amount !== null && power.amount !== undefined && (
                      <span> | Amount: {power.amount}</span>
                    )}

                    {power.amount_ascension !== null && power.amount_ascension !== undefined && (
                      <span> / Ascension: {power.amount_ascension}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {monster.notes && (
            <p>
              <strong>Notes:</strong> {monster.notes}
            </p>
          )}

          <h4>Moves</h4>

          {monster.moves && monster.moves.length > 0 ? (
            <ul>
              {monster.moves.map((move) => (
                <li className="move-item" key={move.id}>
                  <strong>{move.name}</strong> — {move.intent}

                  {move.damage && (
                    <span>
                      {" "}
                      | Damage: {move.damage.normal}
                      {move.damage.hit_count
                        ? ` x ${move.damage.hit_count}`
                        : ""}
                      {move.damage.ascension
                        ? ` / Ascension: ${move.damage.ascension}`
                        : ""}
                    </span>
                  )}

                  {move.block && (
                    <span>
                      {" "}
                      | Block: {move.block.normal}
                      {move.block.ascension
                        ? ` / Ascension: ${move.block.ascension}`
                        : ""}
                    </span>
                  )}

                  {move.heal && (
                    <span>
                      {" "}
                      | Heal: {move.heal.normal}
                      {move.heal.ascension
                        ? ` / Ascension: ${move.heal.ascension}`
                        : ""}
                    </span>
                  )}

                  {move.powers && move.powers.length > 0 && (
                    <ul>
                      {move.powers.map((power, index) => (
                        <li key={index}>
                          Power: {power.power_id} | Target: {power.target} |
                          Amount: {power.amount}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No move data available.</p>
          )}
        </div>
      ))}
    </div>
  </>
);
}

export default Monsters;