import React, { useState, useCallback, useMemo } from 'react';
import props from './assets/props.json';
import alternates from './assets/alternates.json';
import TeamTables from './components/TeamTable.jsx';
import SearchBar from './components/SearchBar.jsx';
import {
  groupDataByTeamAndPlayer,
  groupAlternatesByPlayer,
  processData,
} from './utils/dataUtils';
import './styles/App.css';

const initialFilters = {
  position: { PG: true, PF: true, C: true, SF: true, SG: true },
  statType: { points: true, rebounds: true, assists: true, steals: true },
  marketSuspended: 'all',
  searchTerm: '',
};

function App() {
  // Define state variables using useState hook
  const [processedData, setProcessedData] = useState(() => {
    // Initialize market status data
    return processData(props, groupAlternatesByPlayer(alternates));
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(initialFilters);

  // Memoize the result of groupDataByTeamAndPlayer to avoid unnecessary calculations
  const memoizedGroupedData = useMemo(() => {
    return groupDataByTeamAndPlayer(processedData, filters);
  }, [processedData, filters]);

  //updates the state of filters when applied in the SearchBar
  const handleFilterChange = useCallback((filterType, value, checked) => {
    setFilters((prev) => {
      let updatedFilter = {};

      if (filterType === 'position') {
        updatedFilter = { position: { ...prev.position, [value]: checked } };
      } else if (filterType === 'statType') {
        updatedFilter = { statType: { ...prev.statType, [value]: checked } };
      } else if (filterType === 'marketSuspended') {
        updatedFilter = { marketSuspended: value };
      } else if (filterType === 'searchTerm') {
        updatedFilter = { searchTerm: value };
      }

      return { ...prev, ...updatedFilter };
    });
  }, []);

  // Function to toggle market status data when toggled by user
  const toggleMarketStatus = (playerId, statType) => {
    const updatedData = processedData.map((player) => {
      if (player.playerId === playerId && player.statType === statType) {
        return {
          ...player,
          marketSuspended: !player.marketSuspended,
        };
      }

      return player;
    });
    setProcessedData(updatedData);
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
      />
    </div>
  );
}

export default App;
