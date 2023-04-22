import React, { useState, useEffect } from 'react';
import markets from './assets/props.json';
import odds from './assets/alternates.json';
import TeamTables from './components/TeamTable.jsx';
import Sidebar from './components/Sidebar.jsx';
import './styles/App.css';

function App() {
  const [filters, setFilters] = useState({
    position: { PG: true, PF: true, C: true, SF: true, SG: true },
    statType: { points: true, rebounds: true, assists: true, steals: true },
    marketSuspended: 'all',
  });

  const [groupedData, setGroupedData] = useState(() =>
    groupDataByTeamAndPlayer(markets, filters)
  );
  const groupedAlts = groupAlternatesByPlayer(odds);

  useEffect(() => {
    setGroupedData(groupDataByTeamAndPlayer(markets, filters));
  }, [filters]);

  function handleFilterChange(filterType, value, checked) {
    if (filterType === 'position') {
      setFilters((prev) => ({
        ...prev,
        position: { ...prev.position, [value]: checked },
      }));
    } else if (filterType === 'statType') {
      setFilters((prev) => ({
        ...prev,
        statType: { ...prev.statType, [value]: checked },
      }));
    } else if (filterType === 'marketSuspended') {
      setFilters((prev) => ({
        ...prev,
        marketSuspended: value,
      }));
    }
  }

  // Function to group data by team and then by player
  function groupDataByTeamAndPlayer(data, filters) {
    const { position, statType, marketSuspended } = filters;

    const filteredData = data.filter(
      (player) =>
        position[player.position] &&
        statType[player.statType] &&
        (marketSuspended === 'all' ||
          (marketSuspended === 'suspended' && player.marketSuspended) ||
          (marketSuspended === 'open' && !player.marketSuspended))
    );
    return filteredData.reduce((groupedData, item) => {
      const { teamNickname, playerId } = item;

      // Initialize a new object for the team if it doesn't exist
      if (!groupedData[teamNickname]) {
        groupedData[teamNickname] = {};
      }

      // Initialize a new array for the player if it doesn't exist
      if (!groupedData[teamNickname][playerId]) {
        groupedData[teamNickname][playerId] = [];
      }

      // Add the item to the player's array
      groupedData[teamNickname][playerId].push(item);
      return groupedData;
    }, {});
  }
  // Function to group alternate odds by player and then by statType
  function groupAlternatesByPlayer(data) {
    return data.reduce((groupedData, item) => {
      const { playerId, statType } = item;

      // Initialize a new object for the player if it doesn't exist
      if (!groupedData[playerId]) {
        groupedData[playerId] = {};
      }

      // Initialize a new array for the statType if it doesn't exist
      if (!groupedData[playerId][statType]) {
        groupedData[playerId][statType] = [];
      }

      // Add the item to the statType's array
      groupedData[playerId][statType].push(item);
      return groupedData;
    }, {});
  }

  return (
    <div className="App">
      <Sidebar filters={filters} onFilterChange={handleFilterChange} />
      <TeamTables groupedData={groupedData} groupedAlts={groupedAlts} />
    </div>
  );
}

export default App;
