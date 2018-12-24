import axios from 'axios'; // to tackle with AJAX request
// Only purpose of redux-thunk is to break the rule that once we call a action creator, it will return a action
// which means it no longer return a reaction immediatly by using redux-thunk (it turns to 'producr' action). becomes the dispatcher

// any time want to communicate with the Backend api, always going to make that request inside the action creator

import {FETCH_USER} from './types'

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data });
};
// in the end, decide what action we are goiing to dispatch

// original code
// export const fetchUser = () => {
//     return function (dispatch) {
//          axios.get('/api/current_user')
//             .then(res => dispatch({ type: FETCH_USER, payload: res }))
//     };
// };

//post request, to send information to the backend
export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
};
