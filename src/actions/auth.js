import { createAction } from 'redux-actions';
import config from '../../config';
const { host } = config;

export const login = createAction('LOGIN');
const loginUri = host + '/api/auth/local';

export const fetchLogin = data => {
	return async dispatch => {
		console.log(data);
		const resp = await fetch(loginUri, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(data)
		});
		const body = await resp.json();
		if(body.data){
			return dispatch(login(body.data));
		} else {
			return dispatch(login(new Error(body.msg)));
		}
	}
};
