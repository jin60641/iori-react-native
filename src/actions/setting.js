import {createAction} from 'redux-actions';
import config from '../../config';
const { host } = config;

export const setProfile = createAction('SETPROFILE');
const setProfileUri = `${host}/api/setting/profile`;

export const fetchSetProfile = (data) => {
    return async (dispatch) => {
        const resp = await fetch(setProfileUri, {
            method: 'POST',
            body: data,
            credentials: 'include'
        });
        const body = await resp.json();
        if(body.data){
            return dispatch(setProfile(body.data));
        } else {
            return dispatch(setProfile(new Error(body.msg)));
        }
    }
};

