import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';
import store from './store';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

const token = localStorage.jwtToken;

if (token) {
  const { dispatch } = store;
  const decoded = jwtDecode(token);
  setAuthToken(token);
  dispatch(setCurrentUser(decoded));
  if (decoded.exp < Date.now / 1000) {
    dispatch(logoutUser());
    window.location.href = 'login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
