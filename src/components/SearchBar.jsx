import React, { useCallback } from 'react';

/**
 * SearchBar component for filtering data by position, stat type, market status, and search term.
 */
export default function SearchBar({
  filters,
  onFilterChange,
  setSearchTerm,
  searchTerm,
}) {
  const positions = ['PG', 'PF', 'C', 'SF', 'SG'];
  const statTypes = ['points', 'rebounds', 'assists', 'steals'];

  // Handle position filter changes
  const handlePositionFilterChange = useCallback(
    (e) => {
      const { value, checked } = e.target;
      onFilterChange('position', value, checked);
    },
    [onFilterChange]
  );

  // Handle stat type filter changes
  const handleStatTypeFilterChange = useCallback(
    (e) => {
      const { value, checked } = e.target;
      onFilterChange('statType', value, checked);
    },
    [onFilterChange]
  );
  // Handle market status filter changes
  const handleMarketSuspendedChange = useCallback(
    (e) => {
      const { value } = e.target;
      onFilterChange('marketSuspended', value);
    },
    [onFilterChange]
  );

  // Handle search input changes
  const handleSearchChange = useCallback(
    (e) => {
      const searchTerm = e.target.value;
      setSearchTerm(searchTerm);
      onFilterChange('searchTerm', searchTerm);
    },
    [onFilterChange, setSearchTerm]
  );

  return (
    <div className="SearchBar">
      <div className="filterGroup">
        <div className="filter">
          <label htmlFor="position-filter">Position:</label>
          {positions.map((pos) => (
            <label key={pos}>
              <input
                id="position-filter"
                type="checkbox"
                name="position"
                value={pos}
                checked={filters.position[pos]}
                onChange={handlePositionFilterChange}
              />
              {pos}
            </label>
          ))}
        </div>
        <div className="filter">
          <label htmlFor="stat-type-filter">Stat Type:</label>
          {statTypes.map((statType) => (
            <label key={statType}>
              <input
                id="stat-type-filter"
                type="checkbox"
                name="statType"
                value={statType}
                checked={filters.statType[statType]}
                onChange={handleStatTypeFilterChange}
              />
              {statType}
            </label>
          ))}
        </div>
      </div>
      <div className="filterGroup">
        <div className="filter">
          <label htmlFor="market-status-filter">Market Status:</label>
          <select
            id="market-status-filter"
            value={filters.marketSuspended}
            onChange={handleMarketSuspendedChange}
          >
            <option value="all">Show all markets</option>
            <option value="suspended">Show suspended markets only</option>
            <option value="open">Show open markets only</option>
          </select>
        </div>
        <div className="filter">
          <label htmlFor="search-filter">Search:</label>
          <input
            id="search-filter"
            type="text"
            placeholder="Search by team or player name"
            onChange={handleSearchChange}
            value={searchTerm}
          />
        </div>
      </div>
    </div>
  );
}
