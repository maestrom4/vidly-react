import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndPointMovies = '/movies';

export async function getMovies() {
  const { data } = await http.get(apiEndPointMovies);
  console.log('movieServices', data);
  console.log('apiEndPointMovies', apiEndPointMovies);
  return data;
}

function movieUrl(id) {
  return `${apiEndPointMovies}/${id}`;
}

export async function getMovie(id) {
  return http.get(movieUrl(id));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(apiEndPointMovies, movie);
}

export async function deleteMovie(id) {
  // const { data } = await movies;
  // const movieInDb = data.find((m) => m._id === id);
  // console.log(' delete result', movieInDb);
  const { data } = await http.delete(movieUrl(id));
  // console.log(' delete result', data);
  // movies.splice(movies.indexOf(movieInDb), 1);
  return data;
}
