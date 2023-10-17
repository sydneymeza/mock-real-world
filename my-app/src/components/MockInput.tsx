import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { pattern } from "./checkInputs";
import { checkFile } from "./checkInputs";
import { mockedCSVMap } from "./mockedJson";
import { mockedSearchNameMap } from "./mockedJson";
import { mockedSearchNumberMap } from "./mockedJson";
import { mockedSearchNoHeadersMap } from "./mockedJson";

interface MockInputProps {
  updateHistory: (command: (string | string[][])[]) => void;
  setNotification: Dispatch<SetStateAction<string>>;
  isBrief: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
}

export function MockInput(props: MockInputProps) {
  const [commandList, setCommandList] = useState<string[]>([]);
  const [loadedData, setLoadedData] = useState<string[][] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // this is our handleClick function
  // it handles the input before the history class formats it
  const handleClick = () => {
    props.setNotification("");
    // checks that the command is registered/we have an output for the 
    // command
    if (pattern(commandList[0])) {
      var newResponse: string | string[][];
      newResponse = "";
      let header = "no";

      // since most of our commands don't need more than 3 items
      // ensures that the input is of the correct length
      if (commandList.length > 3) {
        props.setNotification("Please enter the correct number of terms.");
      }

      // handle mode commands:
      if (commandList[0].toLowerCase() === "brief") {
        props.setMode(true);
        props.setNotification("The mode was switched to brief");
        setCommandList([]);
        return;
      } else if (commandList[0].toLowerCase() === "verbose") {
        props.setMode(false);
        props.setNotification("The mode was switched to verbose");
        setCommandList([]);
        return;
      }

      // series of if statments to load the file
      if (commandList.includes("load_file")) {
        // makes sure that one file is loaded
        if(commandList.length === 2){
          const inputedFilepath = commandList[1];
        
          var filepathMocked = mockedCSVMap.get(inputedFilepath);
          // makes sure that the 'file' is something we can access
          if (filepathMocked) {
            setLoadedData(filepathMocked);
            setFileName(inputedFilepath);
            newResponse = `CSV loaded successfully from ${inputedFilepath}`;
          } else {
            newResponse = "File not found in mocked data.";
          }
        } else {
          newResponse = "Load only 1 file please!";
        }
      }

      // handle viewing data:
      if (commandList.includes("view")) {
        // ensures that loadedData isn't undefined
        if (loadedData) {
          if (loadedData[0].length == 0) {
            newResponse = "The file is empty.";
          } else {
            // ensures that fileName isn't undefined
            if(fileName){
              // mainly used for our mocked data as it checks
              // if the file is registered to have a header
              if (checkFile(fileName)) {
                header = "header";
              } else {
                header = "no";
              }
            }
            newResponse = loadedData;
          }
          // output if a file wasn't loaded first
        } else {
          newResponse = "Data cannot be viewed. Please load a file first.";
        }
      }

      // handle searching data– mock search results; don't actually search
      if (commandList.includes("search")) {
        header = "no";
        // if the data is loaded and we have a name for the file
        if (loadedData && fileName) {
          // checks that the file isn't blanc
          if (loadedData[0].length == 0) {
            newResponse = "The file is empty.";
          } // tells the user to enter a search term if they do not
          else if (commandList.length == 1) {
            newResponse = "Please enter a term to search for.";
          } // checks that a column is being searched for
          else if (commandList.length == 3) {
            var index = commandList[1];
            var value = commandList[2];
            if (!isNaN(parseInt(index))) {
              // uses column number to search
              // use file name and store the map that the map returns
              var csvMap = mockedSearchNumberMap.get(fileName);
              if (csvMap) {
                // use the value and store the answers in temp
                var temp = csvMap.get(index + ", " + value);
                // ensures that temp isn't undefined
                if (temp) {
                  newResponse = temp;
                } else {
                  // if the value or index is not found (within our mocked data)
                  // outputs error response
                  newResponse =
                    "Value or column is not found please enter a new search";
                }
              } else {
                // prints if the file is not found within our mocked map
                newResponse = "Invalid search command for this file";
              }
            } else {
              // uses column name to search
              // use file name and store the map that the map returns
              var csvMap = mockedSearchNameMap.get(fileName);
              if (csvMap) {
                // use the value and store the answers in temp
                var temp = csvMap.get(index + ", " + value);
                // ensures that temp isn't undefined
                if (temp) {
                  newResponse = temp;
                } else {
                  // if the value or index is not found (within our mocked data)
                  // outputs error response
                  newResponse =
                    "Value or column is not found please enter a new search";
                }
              } else {
                // prints if the file is not found within our mocked map
                newResponse = "Invalid search command for this file";
              }
            }
          } else if (commandList.length == 2) {
            // if this there's no header to be searched
            var value = commandList[1];
            // just searches for the value
            var noHeadMap = mockedSearchNoHeadersMap.get(fileName);
            if (noHeadMap) {
              // use the value and store the answers in newResponse
              var temp = noHeadMap.get(value);
              if (temp) {
                newResponse = temp;
              } else {
                // if the value is not found (within our mocked data)
                // outputs error response
                newResponse = "Value is not found please enter a new search";
              }
            } else {
              // prints if the file is not found within our mocked map
              newResponse = "Invalid search command for this file";
            }
          } else {
            // prints if there is less or more inputs required for search
            newResponse = "Invalid search command.";
          }
        } else {
          // prints if data has not been loaded
          newResponse = "Data cannot be viewed. Please load a file first.";
        }
      }


      props.updateHistory([commandList[0], newResponse, header]);
    } else {
      props.setNotification("Please input only the above commmands.");
    }
    setCommandList([]);
  };

  return (
    <div className="mock-input">
      <hr></hr>
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandList}
          setValue={setCommandList}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button
        onClick={handleClick}
      >
        Enter!
      </button>
      <hr></hr>
    </div>
  );
}
