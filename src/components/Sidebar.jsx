import React, { useState } from 'react';

function Sidebar({ onFilterChange }) {
  const [position, setPosition] = useState({
    PG: true,
    PF: true,
    C: true,
    SF: true,
    SG: true,
  });

  const positions = ['PG', 'PF', 'C', 'SF', 'SG'];

  const handleSidebarFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setPosition((prevState) => ({ ...prevState, [value]: checked }));
    onFilterChange(name, value, checked);
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
              checked={position[pos]}
              onChange={handleSidebarFilterChange}
            />
            {pos}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
