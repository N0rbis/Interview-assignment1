import React from 'react';
// Tipically each component would also have it's own "styling" files created / imported, but in this case they're so tiny, it's left out in main one.

const OutputContainer = (props) => {
    const { winnableMessage, shortestRoute } = props;
    return (
        <div className="outputContainer">
            {winnableMessage}
            <div className="shortestStepsOutput">
                {shortestRoute.map((step, index) => {
                    return (
                        <div key={index}>
                            {step} {index < shortestRoute.length - 1 ? "=>": "=> last number"}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OutputContainer;