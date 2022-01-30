import './firebase.config'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import store from './store';

const GlobalStyle = createGlobalStyle`
  :root {
    --grey: #cccccc;
    --darkgrey: #c5c5c5;
    --darkprimary: #361452;
    --primary: #632496;
  }

  html {
    background-color: #efefef;
  }

  body {
    font-family: sans-serif;
    color: #383838;
    font-size: calc(1vw + 0.5em);

    @media screen and (min-width: 50em) {
      font-size: 1em;
    }
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);
