import http from './httpService';

const apiEndPointMovies = '/movies';

export async function getMovies() {
  const { data } = await http.get(apiEndPointMovies);
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
  const { data } = await http.delete(movieUrl(id));
  return data;
}
