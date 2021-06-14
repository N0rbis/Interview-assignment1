import React, { useState, useEffect } from 'react';
import './App.css';
import GamePanel from './components/gamePanel/GamePanel';

function App() {
  const [inputArray] = useState([1, 2, 0, 3, 0, 2, 0]); // Init the "game" with pre-existing values as a "guider"
  const [userInput, setUserInput] = useState("");
  const [winnableMessage, setWinnableMessage] = useState("");
  const [shortestRoute, setShortestRoute] = useState([]);

  useEffect(() => {
    // On initial mount, convert the existing array to string to be displayed in input
    const convertedArray = inputArray.toString();
    setUserInput(convertedArray);
  }, [inputArray])

  const convertStringToArray = value => {
    const regEx = /[^-0-9, \d]/i;
    const isInputValid = !(regEx.test(value)); // Simple regex confirmation that input is numeric only
    if (isInputValid) {
      const convertedArray = value.split(',');
      const parsedArray = convertedArray.map(arrayItem => {
        return parseInt(arrayItem);
      })
      setUserInput(value);
      const minJumpsRequired = checkArraySteps(parsedArray);
      const winnableMessage = `Minimum amount of jumps required: ${minJumpsRequired}`;
      setWinnableMessage(winnableMessage);
    }
  }

  const checkArraySteps = (array) => {
    // Not sure if recursion should have been used instead (Some places tend to avoid them..) or if complexity should be considered ? eg:
    // Function that breaks down into smaller "same" function with updated parameters..
    // Or if any specific approach should have been considered (linear / topdown / DP etc..)
    // .. Attemped the "challenge" in simpliest understandable (I hope) way that seemed to make sense to me.
    const unwinableMessage = "Game is unwinnable :("
    const arrayLength = array.length;
    const lastStepIndex = arrayLength - 1; // "Win condition" is to land on last element of array, thus it will always be -1 of overall length. 
    let jumpsRequired = 0, stepMaxJump = 0, overAllMaxJump = 0;
    let shortestStepsValues = [];

    //Check if any steps are required at all
    if (arrayLength <= 1) {
      setShortestRoute([]);
      return jumpsRequired;
    }

    // Simple check to see if the first array element is not a 0 or negative value, as it will not move forward thus un-winable
    if (array[0] <= 0) {
      return unwinableMessage;
    }

    // i = starting index.
    for (let i = 0; i < lastStepIndex; i++) {
      let indexValue = array[i];

      //Check if step is a deadEnd:
      if (indexValue <= 0 && overAllMaxJump <= i) {
        // NO more further steps will be available if the value is <= 0, dead end.
        break;
      }

      for (indexValue; indexValue > 0; indexValue--) { // Iterate through each index value to see if it reaches the end of array
        stepMaxJump = indexValue + i; // value of index + index = maximum position we can move to the right
        if (overAllMaxJump < stepMaxJump) {// Check if current itteration max jump is more than overall max jump
          overAllMaxJump = stepMaxJump;
          shortestStepsValues.push(indexValue);
          jumpsRequired++;
        }

        if (stepMaxJump === lastStepIndex) { // if current max possible jump lands exactly on "win" index, break out of child loop
          break;
        }
      }

      if (stepMaxJump === lastStepIndex) { // If "end value" is reached, return the jumps required to reach it.
        setShortestRoute(shortestStepsValues);
        return jumpsRequired;
      }
    }
    setShortestRoute([]);
    return unwinableMessage;
  }

  return (
    <div data-testid="App" className="App">
      <h1>ZitiCity assigment</h1>
      <h2>Array jump "game"</h2>
      <GamePanel convertStringToArray={convertStringToArray} userInput={userInput} shortestRoute={shortestRoute} winnableMessage={winnableMessage} />
    </div>
  );
}

export default App;
