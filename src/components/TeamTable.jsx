import React from 'react';
import PlayerTable from './PlayerTable';
import '../styles/App.css';

function processData(data, groupedAlts) {
  return data.map((row) => {
    const { statType, line } = row;
    const altLines = groupedAlts[statType] || [];
    console.log(altLines);
    const altLineValues = altLines.map((alt) => alt.line);
    const optimalLineExists = altLineValues.includes(line);

    return {
      ...row,
      highLine: Math.max(row.line, ...altLineValues),
      lowLine: Math.min(row.line, ...altLineValues),
      marketSuspended: !optimalLineExists ? 1 : row.marketSuspended,
    };
  });
}

function TeamTables({ groupedData, groupedAlts }) {
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

export default TeamTables;
