import React from 'react';
import PlayerTable from './PlayerTable';
import '../styles/App.css';

function findOddsByLine(altLines, optimalLine) {
  return altLines.find((alt) => alt.line === optimalLine);
}

function processData(data, groupedAlts) {
  return data.map((row) => {
    const { statType, line } = row;

    //check if optimal line exists
    const altLines = groupedAlts[statType] || [];
    const altLineValues = altLines.map((alt) => alt.line);
    const optimalLineExists = altLineValues.includes(line);

    //check if over/under/push odds have one over 40%
    const optimalLine = row.line;
    const {
      overOdds = 0,
      underOdds = 0,
      pushOdds = 0,
    } = findOddsByLine(altLines, optimalLine) ?? {};
    const oddsAboveForty = Math.max(overOdds, underOdds, pushOdds) <= 0.4;
    console.log(oddsAboveForty);
    return {
      ...row,
      highLine: Math.max(row.line, ...altLineValues),
      lowLine: Math.min(row.line, ...altLineValues),
      marketSuspended: !optimalLineExists || oddsAboveForty ? 1 : row.marketSuspended,
    };
  });
}

export default function TeamTables({ groupedData, groupedAlts }) {
  return (
    <div>
      {Object.entries(groupedData).map(([team, players]) => (
        <div key={team}>
          <h2>{team}</h2>
          <div className="playerContainer">
            {Object.entries(players).map(([playerId, playerData]) => {
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

              return (
                <div className="player" key={playerId}>
                  <h3>
                    {playerData[0].playerName} ({playerData[0].position})
                  </h3>
                  <PlayerTable data={sortedData} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
