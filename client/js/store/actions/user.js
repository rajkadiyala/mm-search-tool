import history from '../../history';
import {userApi} from '../../api';
import {getAsyncActionTypes, getAsyncAction} from './_async';

export const GET_USER__ACTIONTYPES = getAsyncActionTypes('GET_USER');
export const LOGOUT__ACTIONTYPES = getAsyncActionTypes('LOGOUT');

export function getUser() {
    return getAsyncAction(GET_USER__ACTIONTYPES, userApi.getUser);
}

export function login(email, password) {
    return getAsyncAction(GET_USER__ACTIONTYPES, async () => {
        const user = await userApi.login({email, password});
        history.push('/neighbors');
        return user;
    });
}

export function signup(email, password) {
    return getAsyncAction(GET_USER__ACTIONTYPES, async () => {
        const user = await userApi.signup({email, password});
        history.push('/neighbors');
        return user;
    });
}

export function logout() {
    return getAsyncAction(LOGOUT__ACTIONTYPES, async () => {
        await userApi.logout();
        history.push('/login');
        return {};
    });
}
