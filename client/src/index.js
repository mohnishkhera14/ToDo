import React from 'react';
import  ReactDOM  from 'react-dom/client';
// import { Provider } from 'react-redux';
// import{legacy_createStore, applyMiddleware, compose} from 'redux'
// import thunk from 'redux-thunk';


import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
