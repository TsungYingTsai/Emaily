// !!! There can only be one default export from a file, so we put in index.js, always
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer
});
