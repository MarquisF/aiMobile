import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router from './route';
import configureStore from './store/configureStore';

const store = configureStore();

export default class App extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}