import React from 'react';
import PlayerTable from './PlayerTable';
import '../styles/App.css';

function processData(data, groupedAlts) {
  return data.map((row) => {
    const { statType } = row;
    const altLines = groupedAlts[statType] || [];
    const altLineValues = altLines.map((alt) => alt.line);
    console.log(altLineValues);
    return {
      ...row,
      highLine: Math.max(row.line, ...altLineValues),
      lowLine: Math.min(row.line, ...altLineValues),
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
              return (
                <div className="player" key={playerId}>
                  <h3>
                    {playerData[0].playerName} ({playerData[0].position})
                  </h3>
                  <PlayerTable data={processedData} />
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
