import React, { useCallback } from 'react';

export default function SearchBar({
  filters,
  onFilterChange,
  setSearchTerm,
  searchTerm,
}) {
  const positions = ['PG', 'PF', 'C', 'SF', 'SG'];
  const statTypes = ['points', 'rebounds', 'assists', 'steals'];

  const handleSearchBarFilterChange = useCallback(
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
              onChange={handleSearchBarFilterChange}
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
              onChange={handleSearchBarFilterChange}
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
