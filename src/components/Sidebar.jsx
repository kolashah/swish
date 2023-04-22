import React, { useState } from 'react';

function Sidebar({ filters, onFilterChange }) {

  const positions = ['PG', 'PF', 'C', 'SF', 'SG'];
  const statTypes = ['points', 'rebounds', 'assists', 'steals'];

  const handleSidebarFilterChange = (e) => {
    const { name, value, checked } = e.target;
    onFilterChange(name, value, checked);
  };

  const handleMarketSuspendedChange = (e) => {
    const { value } = e.target;
    onFilterChange('marketSuspended', value);
  };

  return (
    <div className="Sidebar">
      <div className="filter">
        <span>Position:</span>
        {positions.map((pos) => (
          <label key={pos}>
            <input
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
        <span>Stat Type:</span>
        {statTypes.map((statType) => (
          <label key={statType}>
            <input
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
        <span>Market Status:</span>
        <select
          value={filters.marketSuspended}
          onChange={handleMarketSuspendedChange}
        >
          <option value="all">Show all markets</option>
          <option value="suspended">Show suspended markets only</option>
          <option value="open">Show open markets only</option>
        </select>
      </div>
    </div>
  );
}

export default Sidebar;
