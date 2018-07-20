import {combineReducers} from 'redux';

import socket from "./socket";
import user from "./user";
import post from "./post";
import search from "./search";
import chat from "./chat";
import dialog from "./dialog";

export default combineReducers({
	user,
	socket,
	posts: post,
	searched : search,
	chats : chat,
	dialogs : dialog
});
