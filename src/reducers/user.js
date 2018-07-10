import {handleActions} from 'redux-actions';
import {login,logout,loggedIn,join} from '../actions/auth';

const initialState = {};

export default handleActions({
    [login]: (state, action) => {
        if( action.error ) {
            return state;
        }
        return Object.assign({}, action.payload );
    },
    [logout]: (state, action) => {
        if( action.error ) {
            return state;
        }
        return {};
    },
}, initialState);
