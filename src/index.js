import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {GlobalStyle} from './styles';
import {ThemeProvider} from 'styled-components';
import * as serviceWorker from './serviceWorker';

import {AppProvider} from './context/AppProvider';

const theme = {
  breakpoints: ['40em', '52em', '64em'],
  variants: {},
  text: {},
};

ReactDOM.render(
  <>
    <AppProvider>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AppProvider>
  </>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
