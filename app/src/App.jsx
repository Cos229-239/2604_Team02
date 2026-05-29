import { useState } from "react";
import "./App.css";

import Cards2 from "./components/Cards2";
import Run from "./components/Run";
import Monsters from "./components/Monsters";
import References from "./components/References";

function App() {
  
  
  const [page, setPage] = useState("Home");
  

  return (
    <div style={{ padding: "20px" }}>
      <h1>Spire Architect</h1>
      <p>Slay the Spire Companion App</p>

      <button onClick={() => setPage("Home")}
      style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px" }}>
  Home
</button>
      <button onClick={() => setPage("Run")}
      style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px" }}>
  Current Run
</button>
      <button onClick={() => setPage("EnemyPatterns")}
      style={{ color: "black", backgroundColor: "#ddd", marginRight: "10px" }}>
  Enemy Patterns
</button>
      <button onClick={() => setPage("References")}
      style={{ color: "black", backgroundColor: "#ddd" }}>
  References
</button>
      
{page === "Home" && (
        <>
          <h2>All Cards</h2>
          <Cards2 />
        </>
      )}
  {page === "Run" && (
    <section className="run-dashboard">
      <Run />
    </section>
  )}
  {page === "EnemyPatterns" && (
      <>
      <h2>Enemy Attack Patterns</h2>
      <Monsters />
      </>
    )}
    {page === "References" && (
      <References />
    )}
    </div>
  );
}

export default App;