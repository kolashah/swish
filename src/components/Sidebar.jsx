import React, { useCallback } from 'react';

export default function Sidebar({
  filters,
  onFilterChange,
  setSearchTerm,
  searchTerm,
}) {
  const positions = ['PG', 'PF', 'C', 'SF', 'SG'];
  const statTypes = ['points', 'rebounds', 'assists', 'steals'];

  const handleSidebarFilterChange = useCallback(
    (e) => {
      const { name, value, checked } = e.target;
      onFilterChange(name, value, checked);
    },
    [onFilterChange]
  );

  const handleMarketSuspendedChange = useCallback(
    (e) => {
      const { value } = e.target;
      onFilterChange('marketSuspended', value);
    },
    [onFilterChange]
  );

  const handleSearchChange = useCallback(
    (e) => {
      const searchTerm = e.target.value;
      setSearchTerm(searchTerm);
      onFilterChange('searchTerm', searchTerm);
    },
    [onFilterChange, setSearchTerm]
  );

  return (
    <div className="Sidebar">
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
              onChange={handleSidebarFilterChange}
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
              onChange={handleSidebarFilterChange}
            />
            {statType}
          </label>
        ))}
      </div>
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
        <label htmlFor="searchFilter">Search:</label>
        <input
          type="text"
          placeholder="Search by team or player name"
          onChange={handleSearchChange}
          value={searchTerm}
        />
      </div>
    </div>
  );
}
