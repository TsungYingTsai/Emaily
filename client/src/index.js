import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// redux is like the state manager, using duspatch and action to trigger reducer to modify states
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';


// 1st arg return in array, 2nd initial state of application(here empty obkext), 3rd middle
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


ReactDOM.render(
    <Provider store={store}> <App /> </Provider>,
    // provider can read the changes from the react store with updated states
    //and shown in the children page (here is App e.g)
    document.querySelector('#root')
); // root of component, where the first component rendered to

// check if it can set the enviroment variables successfully
console.log('STRIPE KEY IS',process.env.REACT_APP_STRIPE_KEY)
console.log('ENVIRONMENT IS',process.env.NODE_ENV)
