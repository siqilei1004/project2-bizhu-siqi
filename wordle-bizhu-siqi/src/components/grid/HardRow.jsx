import React from "react";
import HardLetter from "./HardLetter.jsx";

// this is the normal row, and each comprised 6 letters
const HardRow = ({ rowValue }) => {
  return (
    <div className="row">
      <HardLetter letterPosition={0} value={rowValue} />
      <HardLetter letterPosition={1} value={rowValue} />
      <HardLetter letterPosition={2} value={rowValue} />
      <HardLetter letterPosition={3} value={rowValue} />
      <HardLetter letterPosition={4} value={rowValue} />
      <HardLetter letterPosition={5} value={rowValue} />
      <HardLetter letterPosition={6} value={rowValue} />
    </div>
  );
};

export default HardRow;