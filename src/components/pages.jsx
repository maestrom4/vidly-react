import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './movies';
import Rentals from './rentals';
import Customers from './customers';
import MovieForm from './movieForm';
import Page404 from './page404';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import Logout from './logout';
import ProtectedRoute from './commons/protectedRoute';
import '../App.css';

class Pages extends Component {
  render() {
    const { user } = this.props;
    return (
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />

          <ProtectedRoute path="/movies/:id" component={MovieForm} />

          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
          />

          <ProtectedRoute path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/404" component={Page404} />
          <Route
            path="/"
            exact
            render={(props) => <Movies {...props} user={user} />}
          />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/404" />
        </Switch>
      </main>
    );
  }
}

export default Pages;
