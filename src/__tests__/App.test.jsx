import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders team tables', () => {
  render(<App />);
  const teamTables = screen.getAllByText(/Lakers/i);
  expect(teamTables.length).toBeGreaterThan(0);
});
