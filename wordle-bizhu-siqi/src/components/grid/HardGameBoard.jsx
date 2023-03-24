import React from "react";
import HardRow from "./HardRow";

const HardGameBoard = () => {
  return (
    // use several rows to form a board
    <div className = "game-board">


    <div className="board">
      <HardRow rowValue={0} />
      <HardRow rowValue={1} />
      <HardRow rowValue={2} />
      <HardRow rowValue={3} />
      <HardRow rowValue={4} />
    </div>
    </div>
    
  );
};



export default HardGameBoard;