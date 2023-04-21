import React from 'react';
import PlayerTable from './PlayerTable';
import '../styles/App.css';

function TeamTables({ groupedData, groupedAlts }) {
  return (
    <div>
      {Object.entries(groupedData).map(([team, players]) => (
        <div key={team}>
          <h2>{team}</h2>
          <div className="playerContainer">
            {Object.entries(players).map(([playerId, playerData]) => (
              <div className="player" key={playerId}>
                <h3>
                  {playerData[0].playerName} ({playerData[0].position})
                </h3>
                <PlayerTable data={playerData} groupedAlts={groupedAlts} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeamTables;
