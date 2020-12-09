import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableHeader extends Component {
  raiseSort = (path) => {
    const { tableProps, onSort } = this.props;
    tableProps.sortHeaderAsc = !tableProps.sortHeaderAsc;
    tableProps.sortColumn.path = path;
    tableProps.sortColumn.order =
      tableProps.sortHeaderAsc === true ? 'asc' : 'desc';

    onSort({ tableProps });
  };

  renderSortIcon = (column) => {
    const { tableProps } = this.props;
    const { sortColumn } = tableProps;
    if (column.path !== sortColumn.path || column.path === undefined)
      return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  showTableHeader = (props) => {
    const { columns } = props;
    return (
      <tr key="item">
        {columns.map((item, index) => (
          <th
            key={item.id}
            onClick={() => this.raiseSort(item.path)}
            className="clickable"
          >
            {item.label} {this.renderSortIcon(item)}
          </th>
        ))}
      </tr>
    );
  };

  render() {
    return <thead>{this.showTableHeader(this.props)}</thead>;
  }
}

export default TableHeader;

TableHeader.propTypes = {
  tableProps: PropTypes.shape({
    data: PropTypes.array.isRequired,
    // header: PropTypes.array.isRequired,
    sortColumn: PropTypes.shape({
      path: PropTypes.string.isRequired,
      order: PropTypes.string.isRequired,
    }),
    sortHeaderAsc: PropTypes.bool.isRequired,
  }),
};

TableHeader.defaultProps = {
  tableProps: {
    data: [],
    // header: [],
    sortColumn: {
      path: 'title',
      order: 'asc',
    },
    sortHeaderAsc: PropTypes.bool.isRequired,
  },
};
