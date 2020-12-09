import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({
  columns,
  raiseLike,
  raiseDelete,
  onSort,
  data,
  tableProps,
}) => {
  return (
    <table className="table tablesorter">
      <TableHeader tableProps={tableProps} onSort={onSort} columns={columns} />
      <TableBody
        data={data}
        raiseLike={raiseLike}
        raiseDelete={raiseDelete}
        columns={columns}
      />
    </table>
  );
};

export default Table;

Table.propType = {
  data: PropTypes.array.isRequired,
  raiseLike: PropTypes.func.isRequired,
  raiseDelete: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
};

Table.defaultProps = {
  data: [],
  raiseLike: () => {},
  raiseDelete: () => {},
  columns: [],
};
