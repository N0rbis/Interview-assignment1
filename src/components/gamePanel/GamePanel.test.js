import { render, screen, fireEvent } from '@testing-library/react';
import GamePanel from './GamePanel';

test('Renders Game Panel component', () => {
    const guideMessage = "Modify array values separated by a comma to see if the jump game is winnable"
    const placeHolderText = "Type in comma separated numbers";
    const shortestRoute = [];
    const { queryByPlaceholderText } = render(<GamePanel shortestRoute={shortestRoute} />);
    const gamePanelElement = screen.getByTestId('GamePanel');

    expect(gamePanelElement).toBeInTheDocument();
    expect(gamePanelElement).toHaveTextContent(guideMessage);
    expect(queryByPlaceholderText(placeHolderText)).toBeTruthy(); // Making sure that the "array input" also gets rendered.
});

describe("Array input", () => {
    test("Updates on change", () => {
        const shortestRoute = [];
        const placeHolderText = "Type in comma separated numbers";
        const convertStringToArray = jest.fn();
        const { queryByPlaceholderText } = render(<GamePanel shortestRoute={shortestRoute} convertStringToArray={convertStringToArray} />);
        const arrayInput = queryByPlaceholderText(placeHolderText);

        fireEvent.change(arrayInput, {target: {value: "123"}});

        expect(arrayInput.value).toBe("123");

    })
})