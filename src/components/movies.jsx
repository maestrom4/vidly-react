import React, { Component } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import Pagination from './commons/pagination';
import ListGroup from './commons/listGroup';
import MoviesTable from './moviesTable';
import paginate from '../utils/paginate';
import SearchBox from './commons/searchBox';
import './movies.css';

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    table: {},
    pagination: {},
    search: '',
  };

  constructor(props) {
    super(props);
    const { genres, movies, pagination } = this.state;
    movies.data = [];
    genres.selected = {};
    genres.data = [];
    genres.selected = {
      _id: '5b21ca3eesdfdsfb7f6fbccd471820',
      name: 'All Genre',
    };
    pagination.currentPage = 1;
    pagination.pageSize = 4;

    this.setState({
      genres,
      movies,
      table: [],
      pagination,
      search: '',
    });
  }

  async componentDidMount() {
    await this.tableInit();
    await this.genreInit();
    await this.movieInit();
    await this.paginationInt();
  }

  getMovieCount() {
    const { movies } = this.state;
    return movies.length;
  }

  handleDelete = async (id) => {
    const { movies: originalMovies } = this.state;
    const movies = originalMovies;
    movies.data = originalMovies.data.filter((m) => m._id !== id);
    this.setState({ movies });
    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('This movie has already been deleted');
        this.setState({ movies: originalMovies });
      }
    }
  };

  handleLike = (item) => {
    const { movies } = this.state;
    const index = movies.data.indexOf(item);
    movies.data[index].like = !item.like;
    this.setState({ movies });
  };

  handlePageChange = (page, action) => {
    const { pagination } = this.state;
    pagination.currentPage = page;
    pagination.action = action;
    this.setState({ pagination });
  };

  handleItemSelect = (item) => {
    const { genres, pagination } = this.state;
    genres.selected = item;
    pagination.currentPage = 1;
    this.setState({ genres, pagination, search: '' });
  };

  async genreInit() {
    const { genres } = this.state;
    const { data } = await getGenres();
    genres.data = [
      { _id: '5b21ca3eesdfdsfb7f6fbccd471820', name: 'All Genre' },
      ...data,
    ];

    this.setState({ genres });
  }

  async tableInit() {
    const { table, movies } = this.state;
    table.sortHeaderAsc = true;
    table.sortColumn = { path: 'title', order: 'asc' };
    table.data = movies.data;
    this.setState({ table });
  }

  handleSort = (data) => {
    const { table } = this.state;
    table.sortColumn.path = data.tableProps.sortColumn.path;
    this.setState({ table });
  };

  filtered = (movies, genres) => {
    const filtered =
      genres.selected.name === 'All Genre'
        ? movies.data
        : movies.data.filter((data) => data.genre._id === genres.selected._id);
    return filtered;
  };

  sortedTable = (filtered, table) => {
    const sorted = _.orderBy(
      filtered,
      [table.sortColumn.path],
      [table.sortColumn.order]
    );
    return sorted;
  };

  searchItem = (movies, key) => {
    const result = movies.data.filter((item) =>
      item.title.toLowerCase().startsWith(key)
    );
    return result;
  };

  handleSearch = (query) => {
    const { genres, pagination } = this.state;
    genres.selected = { _id: 0, name: '' };
    pagination.currentPage = 1;
    this.setState({ search: query, genres, pagination });
  };

  paginationInt = async () => {
    const { pagination, movies } = this.state;
    pagination.allData = movies;
    pagination.itemsCount = movies.data.length;
    pagination.pageItemSize = 4;
    pagination.currentPage = 1;
    pagination.action = 'data';
    this.setState({ pagination });
  };

  async movieInit() {
    const { movies } = this.state;
    movies.data = await getMovies();
    this.setState({ movies });
  }

  render() {
    // return null;
    const { movies, pagination, genres, table, search } = this.state;
    const { currentPage, pageItemSize } = pagination;
    const { user } = this.props;
    if (movies.data.length === 0)
      return <p className="mt-4 mb-2">There are no movies in the database</p>;
    // console.log('movies', movies);
    const filtered =
      search.length === 0
        ? this.filtered(movies, genres)
        : this.searchItem(movies, search);

    const sorted = this.sortedTable(filtered, table);
    const moviesData = paginate(sorted, currentPage, pageItemSize);
    console.log('movies pagination', pagination);
    // return null;
    return (
      <div className="row mt-4">
        <div className="col-md-3 mt-4">
          <ListGroup items={genres} onItemSelect={this.handleItemSelect} />
        </div>
        <div className="col-md-8">
          {user && (
            <Link to="/movies/new" className="btn btn-primary mb-2">
              New Movie
            </Link>
          )}
          <p className="mt-4 mb-2">
            Showing {filtered.length} movies in the database
          </p>
          <div className="form-group">
            <SearchBox value={search} onChange={this.handleSearch} />
          </div>
          <MoviesTable
            moviesData={moviesData}
            tableProps={table}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            currentPage={pagination.currentPage}
            pageSize={pagination.pageSize}
            onPageChange={this.handlePageChange}
            action={pagination.action}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
