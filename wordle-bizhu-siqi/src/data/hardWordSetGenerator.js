import wordsHard from "./wordsHard.txt";


export const generateHardWordSet = async () => {
  const response = await fetch(wordsHard);
  const result = await response.text();
  const wordArray = result.split("\n");
  //const todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
  const wordSet = new Set(wordArray);
  return { wordSet, wordArray };
};