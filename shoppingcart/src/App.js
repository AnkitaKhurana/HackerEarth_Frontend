import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Dashboard from './components/Dashboard';

import './App.css';
import createStore from './store';

const store = createStore;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
         <Dashboard/>
      </Provider>
    );
  }
}

export default App;