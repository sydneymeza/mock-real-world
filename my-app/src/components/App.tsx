import "../styles/App.css";
import Information from "./Information";
import Mock from "./Mock";

/**
 * This is the highest level component!
 */
function App() {
  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
      </p>
      <Information />
      <Mock />
    </div>
  );
}

export default App;
