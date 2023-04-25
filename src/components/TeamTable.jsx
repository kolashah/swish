import React from 'react';
import PlayerTable from './PlayerTable';

// Render team tables with processed player data
// TeamTables.jsx
function TeamTables({ groupedData, toggleMarketStatus }) {
  return (
    <div>
      {Object.entries(groupedData).map(([team, players]) => (
        <div key={team}>
          <h2>{team}</h2>
          <div className="playerContainer">
            {Object.entries(players).map(([playerId, playerData]) => {
              // Sort the playerData array based on the statType property
              const statTypeOrder = ['points', 'rebounds', 'assists', 'steals'];

              const sortedData = playerData.sort((a, b) => {
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

export default React.memo(TeamTables);
