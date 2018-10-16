import {handleActions} from 'redux-actions';
import {login,logout,join} from '../actions/auth';
//import {follow} from '../actions/relation';
import {setProfile} from '../actions/setting';

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
    [join]: (state, action) => {
        if( action.error ) {
            return state;
        }
        return {};
    },
	[setProfile]: (state, action) => {
		if( action.error ) {
			return state;
		}
		return { ...state, ...action.payload };
	},
/*
	[follow]: (state, action) => {
		if( action.error ) {
			return state;
		}
		return Object.assign(state,{ followings : state.followings+(action.payload?1:-1) })
	}
*/
}, initialState);
