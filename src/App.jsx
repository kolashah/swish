import React, { useState, useCallback, useMemo } from 'react';
import props from './assets/props.json';
import odds from './assets/alternates.json';
import TeamTables from './components/TeamTable.jsx';
import SearchBar from './components/SearchBar.jsx';
import {
  groupDataByTeamAndPlayer,
  groupAlternatesByPlayer,
  processData,
} from './utils/dataUtils';
import './styles/App.css';

function App() {
  const [marketStatusData, setMarketStatusData] = useState(props);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    position: { PG: true, PF: true, C: true, SF: true, SG: true },
    statType: { points: true, rebounds: true, assists: true, steals: true },
    marketSuspended: 'all',
    searchTerm: '',
  });

  // Memoize the result of groupDataByTeamAndPlayer to avoid unnecessary calculations
  const memoizedGroupedData = useMemo(() => {
    const processedData = processData(
      marketStatusData,
      groupAlternatesByPlayer(odds)
    );
    return groupDataByTeamAndPlayer(processedData, filters);
  }, [marketStatusData, filters]);


  //updates the state of filters when applied in the SearchBar
  //if i had more time i'd split this function into four
  const handleFilterChange = useCallback((filterType, value, checked) => {
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
    } else if (filterType === 'searchTerm') {
      setFilters((prev) => ({
        ...prev,
        searchTerm: value,
      }));
    }
  }, []);

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
      <SearchBar
        filters={filters}
        onFilterChange={handleFilterChange}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <TeamTables
        groupedData={memoizedGroupedData}
        toggleMarketStatus={toggleMarketStatus}
        updateMarketStatusData={updateMarketStatusData}
      />
    </div>
  );
}

export default App;
