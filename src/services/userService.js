import http from './httpService';

const apiEndPointUsers = '/users';

export function register(user) {
  return http.post(apiEndPointUsers, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
