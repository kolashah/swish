import React, { useMemo } from 'react';
import { useTable } from 'react-table';

function PlayerTable({ data }) {
  // Function to capitalize the first letter of a word
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

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
        Cell: ({ value }) => (value ? 'Suspended' : 'Open'),
      },
    ],
    []
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
