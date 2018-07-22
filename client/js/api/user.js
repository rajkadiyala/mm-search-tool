import {get, post} from './_http';

export default {

    getUser() {
        return get('/api/auth/me');
    },

    authenticate(request, method) {
        return post(`api/auth/${method}`, request);
    },

    endSession() {
        post('/api/auth/logout');
    },

};
