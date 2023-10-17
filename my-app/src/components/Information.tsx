import "../styles/information.css";

export default function Information() {
  return (
    <div className="Information">
      {/*This is where our list of commands lives. We insert it at the tope of the page so 
      that users will know which commands are accepted by our program */}
      <div className="instruction">
        The following commands or modes can be inputed into the search bar
        below!
      </div>
      <div className="container">
        <div className="commandList">
          <h2>List of Commands:</h2>
          <li>load_file [csv filepath]</li>
          <li>view</li>
          <li>search [column] [value]</li>
        </div>

        <div className="modeList">
          <h2>Modes:</h2>
          <li>brief</li>
          <li>verbose</li>
        </div>
      </div>
    </div>
  );
}
