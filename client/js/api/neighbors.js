import {get} from './_http';

export default {

    getNeighbors() {
        return get('/api/neighbors');
    },

    getNeighbor(id) {
        return get(`api/neighbors/${id}`);
    },

};
