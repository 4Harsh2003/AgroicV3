import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import { Provider } from 'react-redux'

import store from './store';
import './bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

dotenv.config('./../.env');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
