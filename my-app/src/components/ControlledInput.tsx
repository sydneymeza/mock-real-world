import '../styles/main.css';
import { Dispatch, SetStateAction } from 'react';

interface ControlledInputProps {
    value: string[], 

    setValue: Dispatch<SetStateAction<string[]>>,
    ariaLabel: string 
  }
  
  // Input boxes contain state. We want to make sure React is managing that state,
  //   so we have a special component that wraps the input box.
  export function ControlledInput({value, setValue, ariaLabel}: ControlledInputProps) {
    return (
      <input
        type="text"
        className="mock-command-box"
        value={value.join(" ")}
        placeholder="Enter command here!"
        // uses .split("") so that we have a list of strings 
        // to use from the input box
        onChange={(ev) => setValue(ev.target.value.split(" "))}
        aria-label={ariaLabel}
      ></input>
    );
  }