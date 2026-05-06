import monsters from "../data/monsters.json";

function Monsters() {
  return (
    <>
      {monsters.map((monster) => (
        <div className="enemy-card" key={monster.id}>
          <h3>{monster.name}</h3>

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
            </p>
          )}

          <h4>Moves</h4>

          {monster.moves && monster.moves.length > 0 ? (
            <ul>
              {monster.moves.map((move) => (
                <li key={move.id}>
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
    </>
  );
}

export default Monsters;