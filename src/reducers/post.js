import {handleActions} from 'redux-actions';
import { removePost, resetPosts, getPost, getPosts, writePost } from '../actions/newsfeed';

let initialState = [];

export default handleActions({
	[removePost]: (state, action) => {
		if( action.error ){
			return state;
		}
		//const index = state.findIndex( post => post.id === action.payload.id );
		//return state.slice(0,index).concat(action.payload).concat(state.slice(index+1));
		return state;
	},
	[getPosts]: (state, action) => {
		if( action.error ) {
			return state;
		}
		//return state.concat(action.payload);
		return action.payload.posts;
	},
	[writePost]: (state, action) => {
		if( action.error ) {
			return state;
		}
		//return [action.payload].concat(state);
		return [action.payload];
	},
	[getPost]: (state, action) => {
		if( action.error ) {
			return state;
		}
		//return state.concat([action.payload]);
		return [action.payload];
	}
}, initialState );
