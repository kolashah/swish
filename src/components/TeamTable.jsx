import React from 'react';
import PlayerTable from './PlayerTable';

// Render team tables with processed player data
export default function TeamTables({ groupedData, groupedAlts, toggleMarketStatus }) {
  return (
    <div>
      {Object.entries(groupedData).map(([team, players]) => (
        <div key={team}>
          <h2>{team}</h2>
          <div className="playerContainer">
            {Object.entries(players).map(([playerId, playerData]) => {
              // Process player data and calculate market suspension status, highLine, and lowLine
              const processedData = processData(
                playerData,
                groupedAlts[playerId] || {}
              );

              // Sort the processedData array based on the statType property
              const statTypeOrder = ['points', 'rebounds', 'assists', 'steals'];

              const sortedData = processedData.sort((a, b) => {
                const aIndex = statTypeOrder.indexOf(a.statType);
                const bIndex = statTypeOrder.indexOf(b.statType);
                return aIndex - bIndex;
              });

              // Render player data in a table
              return (
                <div className="player" key={playerId}>
                  <h3>
                    {playerData[0].playerName} ({playerData[0].position})
                  </h3>
                  <PlayerTable
                    data={sortedData}
                    toggleMarketStatus={toggleMarketStatus}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// Find odds for the given optimalLine from the array of alternate lines
function findOddsByLine(altLines, optimalLine) {
  return altLines.find((alt) => alt.line === optimalLine);
}

// Process player data by calculating market suspension status, highLine, and lowLine
function processData(data, groupedAlts) {
  return data.map((row) => {
    const { statType, line } = row;

    // Get alternate lines for the given statType
    const altLines = groupedAlts[statType] || [];
    const altLineValues = altLines.map((alt) => alt.line);

    // Check if the optimal line exists in alternate lines
    const optimalLineExists = altLineValues.includes(line);

    // Check if any of over/under/push odds are greater than 40% for the optimal line
    const optimalLine = row.line;
    const {
      overOdds = 0,
      underOdds = 0,
      pushOdds = 0,
    } = findOddsByLine(altLines, optimalLine) ?? {};
    const oddsAboveForty = Math.max(overOdds, underOdds, pushOdds) > 0.4;
    

    // Return processed row data
    return {
      ...row,
      highLine: Math.max(row.line, ...altLineValues),
      lowLine: Math.min(row.line, ...altLineValues),
      marketSuspended:
        !optimalLineExists || !oddsAboveForty ? 1 : row.marketSuspended,
    };
  });
}