import {get, post} from './_http';

export default {

    getUser() {
        return get('/api/auth/me');
    },

    login(request) {
        return post('/api/auth/login', request);
    },

    signup(request) {
        return post('/api/auth/signup', request);
    },

    logout() {
        post('/api/auth/logout');
    },

};
