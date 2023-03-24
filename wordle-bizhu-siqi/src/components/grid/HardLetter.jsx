import React, { useContext, useEffect } from "react";
import { HardAppContext } from "../../HardMode";


// this takes care of each individual cell guess 
const HardLetter = ({ letterPosition, value }) => {
    const { board, correctWord, cursorPos, setDisabledLetters} =
        useContext(HardAppContext);
    const letter = board[value][letterPosition];
    const lowerCaseLetter = letter.toLowerCase();
    
    // Correct letter in the correct position
  const correctLetter = correctWord[letterPosition] === lowerCaseLetter;

  //check mutiple ocurrence of the letter
  // Correct letter in the wrong position
  const partialCorrect =
    !correctLetter && letter !== "" && correctWord.includes(lowerCaseLetter);

  // Determines class for letter
  let letterState;
if (cursorPos.rowPosition > value) {
  if (correctLetter) {
    letterState = "correct";
  } else if (partialCorrect) {
    letterState = "partial";
  } else {
    letterState = "incorrect";
  }
} 

useEffect(() => {
    // when the guess is complete, add the incorrect letter to the disabled letter array
    if (letterState === "incorrect") {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [cursorPos.rowPosition, letter, letterState, setDisabledLetters]); 
    return (
        <div className="letter"
        id={letterState}>
            {letter}
        </div>
    );
};

export default HardLetter; 