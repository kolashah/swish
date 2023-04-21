import React from 'react';
import { useTable } from 'react-table';

function PlayerTable({ data }) {

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const columns = React.useMemo(
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

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
