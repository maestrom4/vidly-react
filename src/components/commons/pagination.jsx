import React from 'react';
import _ from 'lodash';
import '../../resource/commons/pagination.css';
import PropTypes from 'prop-types';

const previous = (currentPage, onPageChange, action) => {
  const notEqualOne = currentPage > 1 ? currentPage - 1 : 1;
  const classes = action === 'previous' ? 'page-item active' : 'page-item';
  return (
    <li className={classes}>
      <button
        type="button"
        className="page-link"
        aria-label="Previous"
        onClick={() => onPageChange(notEqualOne, 'previous')}
      >
        Previous
      </button>
    </li>
  );
};
const next = (itemData, currentPage, onPageChange, action) => {
  const numberNotMax =
    currentPage < itemData.length ? currentPage + 1 : itemData.length;
  const classes = action === 'next' ? 'page-item active' : 'page-item';
  return (
    <li className={classes}>
      <button
        type="button"
        className="page-link"
        href="#"
        aria-label="Next"
        onClick={() => onPageChange(numberNotMax, 'next')}
      >
        Next
      </button>
    </li>
  );
};

const paginationItem = (itemData, onPageChange, currentPage) => {
  return itemData.map((pageNumber) => {
    const active =
      pageNumber === currentPage ? 'page-item active' : 'page-item';
    return (
      <li key={pageNumber} className={active}>
        <button
          onClick={() => onPageChange(pageNumber, 'data')}
          type="button"
          className="page-link active-selected"
        >
          {pageNumber}
        </button>
      </li>
    );
  });
};

const Pagination = (props) => {
  const { itemsCount, currentPage, pageSize, onPageChange, action } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount <= 1) return null;
  const itemData = _.range(1, pagesCount + 1);
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {previous(currentPage, onPageChange, action)}
        {paginationItem(itemData, onPageChange, currentPage)}
        {next(itemData, currentPage, onPageChange, action)}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
};

Pagination.defaultProps = {
  itemsCount: 4,
  currentPage: 1,
  pageSize: 4,
  onPageChange: () => {},
  action: 'data',
};

export default Pagination;
