import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders main app component', () => {
  render(<App />);
  const appElement = screen.getByTestId('App');
  expect(appElement).toBeInTheDocument();
  expect(appElement).toHaveTextContent('ZitiCity assigment');
  expect(appElement).toHaveTextContent('Array jump "game"');
});
