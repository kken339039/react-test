import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'
import reducer from './store/reducer'
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import App from './App'
import './assets/common.scss'

const store = compose(applyMiddleware(thunk))(createStore)(reducer);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

