import { useState } from "react";

import afflictions from "../data/afflictions.json";
import intents from "../data/intents.json";
import keywords from "../data/keywords.json";

const cleanText = (text) => {
  if (!text) {
    return "";
  }

  return text.replace(/\[\/?(blue|gold|red|green|energy)\]/g, "");
};

function References() {
  const [selectedReference, setSelectedReference] = useState("Afflictions");
  const [searchTerm, setSearchTerm] = useState("");

  const referenceData = {
    Afflictions: afflictions,
    Intents: intents,
    Keywords: keywords,
  };

  const currentData = referenceData[selectedReference];

  const filteredReferences = currentData.filter((item) => {
    const name = item.name || "";
    const description = item.description || item.effect || "";

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="references-header">
        <h2>References</h2>
        <p>
          Browse useful game reference information, including afflictions,
          intents, and keywords.
        </p>
      </div>

      <div className="reference-controls">
        <input
          type="text"
          placeholder="Search references..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          value={selectedReference}
          onChange={(event) => {
            setSelectedReference(event.target.value);
            setSearchTerm("");
          }}
        >
          <option value="Afflictions">Afflictions</option>
          <option value="Intents">Intents</option>
          <option value="Keywords">Keywords</option>
        </select>
      </div>

      <p className="reference-count">
        Showing {filteredReferences.length} of {currentData.length}{" "}
        {selectedReference}
      </p>

      <div className="reference-grid">
        {filteredReferences.map((item) => (
          <div className="reference-card" key={item.id || item.name}>
            <h3>{item.name}</h3>

            {item.type && (
              <div className="reference-stat">
                <span>Type</span>
                <strong>{item.type}</strong>
              </div>
            )}

            {item.intent && (
              <div className="reference-stat">
                <span>Intent</span>
                <strong>{item.intent}</strong>
              </div>
            )}

            {item.description && (
              <p className="reference-description">{cleanText(item.description)}</p>
            )}

            {item.effect && (
              <p className="reference-description">{cleanText(item.effect)}</p>
            )}

            {item.notes && (
              <p className="reference-notes">
                <strong>Notes:</strong> {cleanText(item.notes)}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default References;