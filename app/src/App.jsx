import "./App.css";

import Cards2 from "./components/Cards2";
import Monsters from "./components/Monsters";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Spire Architect</h1>
        <p>Slay the Spire Companion App</p>
      </header>

      <section>
        <Cards2 />
      </section>

      <section>
        <h2>All Monsters</h2>

        <div className="monster-grid">
          <Monsters />
        </div>
      </section>
    </div>
  );
}

export default App;