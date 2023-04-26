import { render, screen, waitFor } from '@testing-library/react';
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


test('searches for players by name or team', async () => {
  render(<App />);

  const searchInput = screen.getByLabelText(/Search/i);

  // Type in search term and check that input value is updated
  await userEvent.type(searchInput, 'LeBron');
  expect(searchInput).toHaveValue('LeBron');

  // Check that player table only displays LeBron James
  const lebronPlayer = screen.getByText(/LeBron James/i);
  expect(lebronPlayer).toBeInTheDocument();
  const nonLeBronPlayers = screen.queryByText(/Stephen Curry/i);
  expect(nonLeBronPlayers).not.toBeInTheDocument();
});
