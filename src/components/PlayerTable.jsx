import React from 'react';
import { useTable } from 'react-table';

function PlayerTable({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Stat Type',
        accessor: 'statType',
      },
      {
        Header: 'Market Status',
        accessor: 'marketSuspended',
        Cell: ({ value }) => (value ? 'Suspended' : 'Open'),
      },
      {
        Header: 'Line',
        accessor: 'line',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      style={{ borderCollapse: 'collapse', width: '300px' }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{ borderBottom: 'solid 2px gray', textAlign: 'left' }}
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
