import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { CookiesProvider } from 'react-cookie';

const loggerMiddleware = createLogger();
const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    )
);

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </CookiesProvider>,
    document.getElementById('root'));
// registerServiceWorker();
