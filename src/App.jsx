import React, { useState, useEffect } from 'react';
import initialData from './assets/props.json';
import odds from './assets/alternates.json';
import TeamTables from './components/TeamTable.jsx';
import Sidebar from './components/Sidebar.jsx';
import './styles/App.css';

function App() {
  //create state for filters
  const [filters, setFilters] = useState({
    position: { PG: true, PF: true, C: true, SF: true, SG: true },
    statType: { points: true, rebounds: true, assists: true, steals: true },
    marketSuspended: 'all',
  });
  //create state for market status data
  const [marketStatusData, setMarketStatusData] = useState(initialData);

  //create state for grouped data
  const [groupedData, setGroupedData] = useState(() =>
    groupDataByTeamAndPlayer(marketStatusData, filters)
  );

  //update grouped data when filters change
  useEffect(() => {
    setGroupedData(groupDataByTeamAndPlayer(marketStatusData, filters));
  }, [filters, marketStatusData]);

  //updates the state of filters when applied in the sidebar
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

  //when filters are applied, filter data sent to TeamTables
  function filterData(data) {
    const { position, statType, marketSuspended } = filters;

    return data.filter(
      (player) =>
        position[player.position] &&
        statType[player.statType] &&
        (marketSuspended === 'all' ||
          (marketSuspended === 'suspended' && player.marketSuspended) ||
          (marketSuspended === 'open' && !player.marketSuspended))
    );
  }

  // Function to group data by team and then by player
  function groupDataByTeamAndPlayer(data) {
    const filteredData = filterData(data);

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

  const groupedAlts = groupAlternatesByPlayer(odds);

  // Function to toggle market status data when toggled by user
  const toggleMarketStatus = (playerId, statType) => {
    const updatedData = marketStatusData.map((player) => {
      if (player.playerId === playerId && player.statType === statType) {
        return {
          ...player,
          marketSuspended: !player.marketSuspended,
        };
      }
      return player;
    });
    setMarketStatusData(updatedData);
  };

  // Function update the market suspended status based on the processedData function in TeamTables
  const updateMarketStatusData = (playerId, statType, newStatus) => {
    setMarketStatusData((prevData) =>
      prevData.map((player) =>
        player.playerId === playerId && player.statType === statType
          ? { ...player, marketSuspended: newStatus }
          : player
      )
    );
  };

  return (
    <div className="App">
      <Sidebar filters={filters} onFilterChange={handleFilterChange} />
      <TeamTables
        groupedData={groupedData}
        groupedAlts={groupedAlts}
        toggleMarketStatus={toggleMarketStatus}
        updateMarketStatusData={updateMarketStatusData}
      />
    </div>
  );
}

export default App;
