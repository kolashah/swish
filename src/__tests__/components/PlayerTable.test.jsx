import { render, screen } from '@testing-library/react';import PlayerTable from '../../components/PlayerTable'

const data = [
  {
    playerName: 'LeBron James',
    statType: 'points',
    value: 35,
    optimalLine: 30,
    highLine: 35,
    lowLine: 25,
    marketStatus: 'Open',
  },
  {
    playerName: 'LeBron James',
    statType: 'rebounds',
    value: 10,
    optimalLine: 8,
    highLine: 10,
    lowLine: 6,
    marketStatus: 'Suspended',
  },
  {
    playerName: 'Anthony Davis',
    statType: 'points',
    value: 20,
    optimalLine: 25,
    highLine: 30,
    lowLine: 20,
    marketStatus: 'Open',
  },
  {
    playerName: 'Anthony Davis',
    statType: 'rebounds',
    value: 8,
    optimalLine: 10,
    highLine: 12,
    lowLine: 8,
    marketStatus: 'Open',
  },
];


test('renders table headers', () => {
  render(<PlayerTable data={data} />);
  expect(screen.getByText(/Stat Type/i)).toBeInTheDocument();
  expect(screen.getByText(/Optimal Line/i)).toBeInTheDocument();
  expect(screen.getByText(/High Line/i)).toBeInTheDocument();
  expect(screen.getByText(/Low Line/i)).toBeInTheDocument();
  expect(screen.getByText(/Market Status/i)).toBeInTheDocument();
});

test('renders table rows', () => {
  render(<PlayerTable data={data} />);
  const rows = screen.getAllByRole('row');
  expect(rows.length).toBeGreaterThan(1); // At least header row and one data row
});
