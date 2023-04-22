import { render, screen } from '@testing-library/react';
import TeamTables from '../../components/TeamTable';

const groupedData = {
  Lakers: {
    1: [
      {
        playerName: 'Russell Westbrook',
        playerId: 1,
        teamId: 13,
        teamNickname: 'Lakers',
        teamAbbr: 'LAL',
        statType: 'assists',
        statTypeId: 102,
        position: 'PG',
        marketSuspended: 0,
        line: 8.5,
      },
    ],
  },
}; 
const groupedAlts = {
  assists: [
    {
      playerName: 'Russell Westbrook',
      playerId: 1,
      statType: 'assists',
      statTypeId: 102,
      line: 7.5,
      underOdds: 0.366,
      overOdds: 0.634,
      pushOdds: 0,
    },
  ],
}; 

test('renders player tables', () => {
  render(<TeamTables groupedData={groupedData} groupedAlts={groupedAlts} />);
  const playerTables = screen.getAllByText(/Russell Westbrook/i); // Replace "Player Name" with an actual player name in your data
  expect(playerTables.length).toBeGreaterThan(0);
});

test('renders player tables with alt stats', () => {
  render(<TeamTables groupedData={groupedData} groupedAlts={groupedAlts} />);
  const playerTables = screen.getAllByText(/Russell Westbrook/i);
  expect(playerTables.length).toBeGreaterThan(0);
});

