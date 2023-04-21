import React from 'react';
import PlayerTable from './PlayerTable';
 

function TeamTables({ groupedData}) {
  
  return (
    <div>
      {Object.entries(groupedData).map(([team, players]) => (
        <div key={team}>
          <h2>{team}</h2>
          {Object.entries(players).map(([player, playerData]) => (
            <div className="player" key={player}>
              {console.log(playerData)}
              <h3>{player} ({playerData[0].position})</h3>
              <PlayerTable data={playerData} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TeamTables;
