import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Checks if the table headers are present on the page
test('renders table headers for all player tables', () => {
  render(<App />);
  expect(screen.getAllByText(/Stat Type/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Optimal Line/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/High Line/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Low Line/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Market Status/i).length).toBeGreaterThan(0);
});

// Add more integration tests here:
// - Test filtering functionality by interacting with filter controls
// - Test search functionality by interacting with the search bar
// - Test manual suspend/release functionality by interacting with corresponding controls
