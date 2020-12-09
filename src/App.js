import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/commons/navBar';
import Pages from './components/pages';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <main className="container-fluid px-0">
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Pages user={this.state.user} />
      </main>
    );
  }
}

export default App;
