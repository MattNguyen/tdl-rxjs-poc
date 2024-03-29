import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureAppStore from './store/configure'
import * as serviceWorker from './serviceWorker';

import Routes from './routes'

configureAppStore().then(store => {
  return ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,

    document.getElementById('root')
  );
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
