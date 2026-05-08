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
        <div className="monsters-section">
          <h1>Monsters</h1>
          <p>Information about monsters in the game</p>
          <Monsters />
        </div>
      </section>

      
    </div>
  );
}

export default App;