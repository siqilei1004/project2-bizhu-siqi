// import React from 'react'

// function HardMode() {
//   return (
//     <div>
//         <h1>
//         This is the hardMode
//             </h1></div>
//   )
// }

// export default HardMode

import './App.css';
import React, { useState, useEffect, createContext } from "react";
import { hardGameBoard } from './data/hardGameBoard';
import HardGameBoard from './components/grid/HardGameBoard';
import HardKeyboard from './components/inputKeyBoard/HardKeyboard'
// import RulesPage from './components/pageSections/RulesPage';
import Footer from './components/pageSections/Footer';
import Navbar from './components/pageSections/Navbar';
import HardGameEndPage from './components/pageSections/HardGameEndPage';
import { generateHardWordSet } from './data/hardWordSetGenerator';
import Setting from './components/pageSections/Setting'


export const HardAppContext = createContext();

function HardMode() {
  // The rule page pops up if this is the first time a user plays the game
  const [newGame, setNewGame] = useState(true);
  // set the board 
  const [board, setBoard] = useState(hardGameBoard);
  const [disabledLetters, setDisabledLetters] = useState([]);
  // Represents the current game's word
  const [correctWord, setCorrectWord] = useState("");

  // all the available words - inital state is empty Set 
  const [words, setWords] = useState(new Set());

  // word set as an array 
  const [wordArray, setWordArray] = useState([]);
  // sets the initial position for the cursor, it's at the first position 
  const [cursorPos, setCursorPos] = useState({
    rowPosition: 0,
    letterPosition: 0,
  });

  // state for end of game page 
  const [gameEnd, setGameEnd] = useState({ gameOver: false, playerWon: false });

 

  // UseEffect to set words and generate new word from the array 
  useEffect(() => {
    generateHardWordSet().then((words) => {
      setWords(words.wordSet);
      setWordArray(words.wordArray);
      setCorrectWord(
        words.wordArray[Math.floor(Math.random() * words.wordArray.length)]
      );
    });
  }, []);

  // Player moves
  // Adds letter to current board and then updates the current board position
  const onPlayerSelect = (letter) => {
    if (cursorPos.letterPosition === 7) return;
    const updatedBoard = [...board];
    updatedBoard[cursorPos.rowPosition][cursorPos.letterPosition] = letter;
    setBoard(updatedBoard);
    setCursorPos({
      ...cursorPos,
      letterPosition: cursorPos.letterPosition + 1,
    });
  };

  const onPlayerEnter = () => {
    // Cannot enter if player is not on the last letter position
    if (cursorPos.letterPosition !== 7) {
      alert("The word is 7-letter long");
      return;}
    // get the string of the current trial 
    const wordGuess = board[cursorPos.rowPosition].join("").toLowerCase();

    // Check if word guessed is in the given list 
    if (words.has(wordGuess)) {
      // If player presses enter on the last letter of the row, go to the next row
      setCursorPos({
        rowPosition: cursorPos.rowPosition + 1,
        letterPosition: 0,
      });
    } else {
      alert("Not a word. Please try again.");
    }
    if (wordGuess === correctWord) {
      setGameEnd({ gameOver: true, playerWon: true });
      return;
    }
    if (cursorPos.rowPosition === 5) {
      setGameEnd({ gameOver: true, playerWon: false });
    }
  };

  const onPlayerDelete = () => {
    // Cannot delete if player is in the first letter position
    if (cursorPos.letterPosition === 0) return;
    // If player presses delete, go to the previous position and set tile to blank
    const boardInMotion = [...board];
    boardInMotion[cursorPos.rowPosition][cursorPos.letterPosition - 1] = "";
    setBoard(boardInMotion);
    setCursorPos({
      ...cursorPos,
      letterPosition: cursorPos.letterPosition - 1,
    });
  };

  return (
    <>
      <div>
        <Navbar/>
        <Setting/>
        <section>
          <HardAppContext.Provider value={{
            board,
            setBoard,
            newGame,
            setNewGame,
            cursorPos,
            setCursorPos,
            onPlayerSelect,
            onPlayerEnter,
            onPlayerDelete,
            correctWord,
            setCorrectWord,
            wordArray,
            disabledLetters,
            setDisabledLetters,
            gameEnd,
            setGameEnd
          }}>
            <HardGameBoard />
            <HardKeyboard />
            {/* {newGame && <RulesPage />} */}
            {gameEnd.gameOver && <HardGameEndPage />}
          </HardAppContext.Provider>
        </section>
        <Footer />
      </div>
    </>
  );
}


export default HardMode;