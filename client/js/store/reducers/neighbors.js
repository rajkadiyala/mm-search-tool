import {GET_NEIGHBORS__ACTIONTYPES, GET_NEIGHBOR__ACTIONTYPES} from '../actions/neighbors';

const INITIAL_STATE = {
    neighbors: [],
    selectedNeighbor: null,
};

export default function neighbors(state = INITIAL_STATE, action) {
    switch (action.type) {
		case GET_NEIGHBORS__ACTIONTYPES.SUCCESS:
			return {...state, neighbors: action.asyncSuccessData.data};
		case GET_NEIGHBOR__ACTIONTYPES.SUCCESS:
			return {...state, selectedNeighbor: action.asyncSuccessData.data};
        default:
            return state;
    }
}
