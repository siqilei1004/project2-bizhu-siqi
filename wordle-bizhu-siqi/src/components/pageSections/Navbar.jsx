
import information from '../../assets/information.png';
import setting from '../../assets/setting.png';
import React, { useState } from "react";
import RulesPage from './RulesPage';
import { AppContext } from "../../DefaultMode";
import Setting from './Setting'

function Navbar() {
    // The rule page pops up if this is the first time a user plays the game
    const [newGame, setNewGame] = useState(false);
    const [buttonPopUp, setButtonPopUp] = useState(false);

  return (
    <div className="navbar">
          <img src = {information} 
            className="navbar-img left-img" alt = "information-img"
            onClick={() => {setNewGame(true);}} />
            <h1 className="full-width">Wordle</h1>
            <img src = {setting}
              className="navbar-img right-img" alt = "setting-img"
              onClick={() => {setButtonPopUp(true);}}
            />
            <Setting trigger = {buttonPopUp} 
            setTrigger = {setButtonPopUp}>

            </Setting>
    <AppContext.Provider value={{
            newGame,
            setNewGame,
           
          }}>
            {newGame && <RulesPage />}
          </AppContext.Provider>
    </div>
  )
}


export default Navbar