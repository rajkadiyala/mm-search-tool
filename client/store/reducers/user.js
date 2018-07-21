import {
    GET_USER__ACTIONTYPES,
    LOGOUT__ACTIONTYPES,
} from '../actions/user';

const INITIAL_STATE = {};

export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_USER__ACTIONTYPES.SUCCESS:
            return action.asyncSuccessData.data;
        case LOGOUT__ACTIONTYPES.SUCCESS:
            return INITIAL_STATE;
        case GET_USER__ACTIONTYPES.FAILURE:
            return {errorMessage: action.asyncFailureData.errorMessage};
        default:
            return state;
    }
}
