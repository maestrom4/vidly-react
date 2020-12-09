import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { getGenres } from '../services/genreService';
import { getMovies, getMovie, saveMovie } from '../services/movieService';
import Form from './commons/form';

class MovieForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .precision(1)
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate'),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;
    // try {
    const { data } = await getMovie(movieId);
    this.setState({ data: this.mapToViewModel(data) });
    // } catch (ex) {
    //   if (ex.response && ex.response.status === 404)
    //     toast.error('Id already deleted');
    //   this.props.history.replace('/page404');
    // }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    const { history } = this.props;
    try {
      await saveMovie(this.state.data);
    } catch (ex) {
      if (ex.response && ex.status === 404) {
        toast.error('This movie has already been deleted');
      }
    }
    history.push('/movies');
  };

  idChecker = (id) => {
    const movies = getMovies();
    return movies.filter((item) => item._id === id);
  };

  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-4">
          <h1>Movie Form</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('title', 'Title')}
            {this.renderSelect('genreId', 'Genre', this.state.genres)}
            {this.renderInput('numberInStock', 'Stock')}
            {this.renderInput('dailyRentalRate', 'Rate')}
            {this.renderButton('Save')}
          </form>
        </div>
      </div>
    );
  }
}

export default MovieForm;
