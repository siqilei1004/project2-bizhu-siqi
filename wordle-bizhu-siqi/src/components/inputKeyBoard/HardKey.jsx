import React, { useContext } from "react";
import { HardAppContext } from "../../HardMode";

const HardKey = ({ key, className, letter, disabled }) => {
  // Subscribes to context created in App.js and uses the states previously defined
  const { onPlayerSelect, onPlayerEnter, onPlayerDelete } =
    useContext(HardAppContext);

  // Onclick when player selects a key on keyboard
  const inputLetter = () => {
    if (letter === "ENTER") {
      onPlayerEnter();
    } else if (letter === "←") {
      onPlayerDelete();
    } else {
      onPlayerSelect(letter);
    }
  };

  return (
    <div
      className={className}
      key={key}
      onClick={inputLetter}
      id={disabled ? "disabled" : ""}
    >
      {letter}
    </div>
  );
};

export default HardKey;