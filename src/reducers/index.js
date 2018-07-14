import {combineReducers} from 'redux';

import user from "./user";
import post from "./post";
import search from "./search";
import chat from "./chat";
import dialog from "./dialog";

export default combineReducers({
	user,
	posts: post,
	searched : search,
	chats : chat,
	dialogs : dialog
});
