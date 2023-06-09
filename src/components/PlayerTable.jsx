import React, { useMemo, useCallback } from 'react';
import { useTable } from 'react-table';

/**
 * Playertable component for creating each player table using react-table framework
 */

function PlayerTable({ data, toggleMarketStatus }) {
  // Function to capitalize the first letter of a word
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleMarketStatusClick = useCallback(
    (playerId, statTypeId) => {
      toggleMarketStatus(playerId, statTypeId);
    },
    [toggleMarketStatus]
  );

  // Define columns for the player table using React.useMemo for performance optimization
  const columns = useMemo(
    () => [
      {
        Header: 'Stat Type',
        accessor: 'statType',
        Cell: ({ value }) => capitalize(value),
      },
      {
        Header: 'Optimal Line',
        accessor: 'line',
      },
      {
        Header: 'High Line',
        accessor: 'highLine',
      },
      {
        Header: 'Low Line',
        accessor: 'lowLine',
      },
      {
        Header: 'Market Status',
        accessor: 'marketSuspended',
        Cell: ({ value, row }) => {
          const onClick = () => {
            handleMarketStatusClick(
              row.original.playerId,
              row.original.statType
            );
          };
          const marketStatus = value ? 'Suspended' : 'Open';
          const buttonStyle = {
            backgroundColor: value ? '#e57373' : '#81c784',
            color: 'white',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '6px',
            width: '80px',
            padding: '3px 0',
          };
          return (
            <button id="marketStatus" onClick={onClick} style={buttonStyle}>
              {marketStatus}
            </button>
          );
        },
      },
    ],
    [handleMarketStatusClick]
  );

  // Create an instance of the table using the useTable hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Render the table using the table instance properties and methods
  return (
    <table
      {...getTableProps()}
      style={{ borderCollapse: 'collapse', width: '100%' }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{ borderBottom: 'solid 2px gray', textAlign: 'center' }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    borderBottom: 'solid 1px gray',
                    padding: '5px 10px',
                  }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default PlayerTable;
