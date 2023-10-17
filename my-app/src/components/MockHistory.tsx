import "../styles/main.css";

interface MockHistoryProps {
  history: (string | string[][])[][];
  mode: boolean;
}
/**
 * Some of this code was borrowed from dkyerema
 * This code sets up our history component by creating a table, calling the table function
 * @param props - the MockHistoryProps interface
 * @returns the structure of our history component
 */
export function MockHistory(props: MockHistoryProps) {
  return (
    <div className="mock-history" aria-label="History">
      {/* This is where command history will go */}
      <div>
        {
         props.history.map((commandList) => (
          // creates a div that is mapped to the command in the history
          <div>
            {/* checks if the mode is verbose */}
            {!props.mode && <p>Command: {commandList[0]}</p>}
            {/* checks if the output is a string */}
            {typeof commandList[1] === "string"? (
              <p>Output: {commandList[1]}</p>
            ) : (
              // checks if the output is a table, and creates one if so
              <div>
                Output:
                {table(commandList[2], commandList[1])}
              </div>
            )}
          </div>
        )
        ) }
      </div>
    </div>
  );
  }

  /**
   * this is the table function that creates a table for the output 
   * from the given data
   * @param header a string that states if there is a header or not
   * @param commandList the data that is stored in a string [][] to be created into a table
   * @returns an html table made from the data
   */
  export function table(header: string | string[][], commandList: string[][]) {
    // stores the first array from the data, its used regardless of 
    // if there's a header, but if there is it allows for easy access
    let heading = commandList[0];
    let body = [];
    // creates a string[][] that is the body of the table, not including 
    // what was used for the header
    for (let i = 1; i < commandList.length; i++) {
      body.push(commandList[i]);
    }
    return (
      <div>
        {/* if there is a header, creates a table with a header */}
        {header === "header" ? (
          <table style={{ width: 500 }}>
            {/* creates a row of type header for the body */}
            <thead>
              <tr>
                {heading.map((head, headID) => (
                  <th key={headID}>{head}</th>
                ))}
              </tr>
            </thead>
            {/* creates the rest of the table */}
            <tbody>
              {body.map((row, rowID) => (
                <tr>
                  {row.map((cell, rowID) => (
                    <td key={rowID}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // creates a table without a header
          <table style={{ width: 500 }}>
            <tbody>
              {/* because var body does not include the heading
                creates a regualr row for heading */}
              <tr>
                {heading.map((row, rowID) => (
                  <td key={rowID}>{row}</td>
                ))}
              </tr>
              {/* creates the rest of the table */}
              {body.map((row, rowID) => (
                <tr key={rowID}>
                  {row.map((cell, rowID) => (
                    <td key={rowID}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
