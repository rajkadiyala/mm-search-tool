import {neighborsApi} from '../../api';
import {getAsyncActionTypes, getAsyncAction} from './_async';

export const GET_NEIGHBORS__ACTIONTYPES = getAsyncActionTypes('GET_NEIGHBORS');
export const GET_NEIGHBOR__ACTIONTYPES = getAsyncActionTypes('GET_NEIGHBOR');

export function getNeighbors() {
    return getAsyncAction(GET_NEIGHBORS__ACTIONTYPES, neighborsApi.getNeighbors);
}

export function getNeighbor(id) {
    return getAsyncAction(GET_NEIGHBOR__ACTIONTYPES, async () => {
        return neighborsApi.getNeighbor(id);
    });
}
