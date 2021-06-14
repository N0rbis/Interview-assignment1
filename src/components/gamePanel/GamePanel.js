import React from 'react';
import OutputContainer from '../outputContainer/OutputContainer';
// Tipically each component would also have it's own "styling" files created / imported, but in this case they're so tiny, it's left out in main one.

const GamePanel = (props) => {
    const { convertStringToArray, winnableMessage, shortestRoute, userInput } = props;
    const guideMessage = "Modify array values separated by a comma to see if the jump game is winnable"

    return (
        <div data-testid="GamePanel" className="mainContainer">
            <input className="arrayInput" type="text" onChange={(e) => convertStringToArray(e.target.value)} value={userInput}
            placeholder="Type in comma separated numbers" name="userInput" autoComplete="off"
            />
            {guideMessage}
            <OutputContainer  winnableMessage={winnableMessage} shortestRoute={shortestRoute}/>
        </div>
    )
}

export default GamePanel;