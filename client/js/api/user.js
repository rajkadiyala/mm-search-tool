import {get, post} from './_http';

export default {

    getUser() {
        return get('/api/auth/me');
    },

    login(request, method) {
        return post(`api/auth/${method}`, request);
    },

    logout() {
        post('/api/auth/logout');
    },

};
