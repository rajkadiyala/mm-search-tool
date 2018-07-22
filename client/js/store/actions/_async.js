import {flashError} from './errors';

export function getAsyncActionTypes(name) {
    return {
        REQUEST: `${name}__REQUEST`,
        SUCCESS: `${name}__SUCCESS`,
        FAILURE: `${name}__FAILURE`,
    };
}

function asyncRequest(actionTypes, requestId) {
    return {
        type: actionTypes.REQUEST,
        asyncRequestData: {requestId},
    };
}

function asyncSuccess(actionTypes, requestId, data) {
    return {
        type: actionTypes.SUCCESS,
        asyncSuccessData: {requestId, data},
    };
}

function asyncFailure(actionTypes, requestId, errorMessage) {
    return {
        type: actionTypes.FAILURE,
        asyncFailureData: {requestId, errorMessage},
    };
}

let requestIdCounter = 0;

export function getAsyncAction(actionTypes, fn) {
    return (dispatch, getState) => {
        const requestId = ++requestIdCounter; // eslint-disable-line no-plusplus
        if (actionTypes.REQUEST) {
            dispatch(asyncRequest(actionTypes, requestId));
        }
        return fn(getState)
            .then(data => {
                dispatch(asyncSuccess(actionTypes, requestId, data));
                return data;
            }).catch(error => {
                console.error(error);
                dispatch(asyncFailure(actionTypes, requestId, error.message));
                dispatch(flashError(error.message));
                throw error;
            });
    };
}
