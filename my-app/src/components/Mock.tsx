import { useState } from "react";
import "../styles/main.css";
import { MockHistory } from "./MockHistory";
import { MockInput } from "./MockInput";

/* 
  This is the class that creates most of our variables that handle state across 
  multiple classes. 
  
  This is where we organize all components in a component folder.
*/

export default function Mock() {
  const [history, setHistory] = useState<(string | string[][])[][]>([]);
  const updateHistory = (command: (string | string[][])[]) => {
    setHistory([command, ...history]);
  };

  const [notification, setNotif] = useState<string>("");
  const [mode, setMode] = useState<boolean>(true);

  return (
    <div className="mock">
      {/* Our input comes before our history so that users can scroll down
      to view the history */}
      <MockInput
        updateHistory={updateHistory}
        setNotification={setNotif}
        isBrief={mode}
        setMode={setMode}
      />
      {notification}
      <MockHistory history={history} mode={mode} />
    </div>
  );
}
