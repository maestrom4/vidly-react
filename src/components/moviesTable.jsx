import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Like from './commons/like';
import Table from './commons/table';
import auth from '../services/authService';

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      id: '5ba21ca3e3sdfsfdfaeeebssabfbcacd471818',
      label: 'Title',
      key: 'title',
      content: (movie) => (
        <NavLink to={`/movies/${movie._id}`}>{movie.title}</NavLink>
      ),
    },
    {
      path: 'genre.name',
      id: '5ba21ca3e3sdfssfdfaeeebssabfbcacd471818',
      label: 'Genre',
    },
    {
      path: 'numberInStock',
      id: '5ba21ca32esdfsfdfaeedebssabfbcacd471818',
      label: 'Stock',
    },
    {
      path: 'dailyRentalRate',
      id: 'zzdfew21ca3234es3dfasfdfaeeebssabfbcacd471818',
      label: 'Rate',
    },
    {
      key: 'like',
      id: '5ba21ca3234es3dfasfdfaeeebssabfbcacd471818',
      content: (movie) => (
        <Like likeData={movie.like} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteColumn = {
    key: 'delete',
    id: '23421ca3234es3dfasfdfaeeebssabfbcacd471818',
    content: (movie) => (
      <button
        type="button"
        onClick={() => this.props.onDelete(movie._id)}
        className="btn btn-danger btn-sm rounded-circle pt-0 pb-0 ml-3 px-2"
      >
        x
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  raiseDelete = (id) => {
    const { onDelete } = this.props;
    onDelete(id);
  };

  raiseLike = (movie) => {
    const { onLike } = this.props;
    onLike({ movie });
  };

  raiseSort = (tableProps) => {
    const { onSort } = this.props;
    onSort(tableProps);
  };

  render() {
    const { moviesData, tableProps } = this.props;

    return (
      <Table
        columns={this.columns}
        raiseLike={this.raiseLike}
        raiseDelete={this.raiseDelete}
        onSort={this.raiseSort}
        tableProps={tableProps}
        data={moviesData}
      />
    );
  }
}

export default MoviesTable;
