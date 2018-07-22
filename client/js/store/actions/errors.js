const DISPLAY_ERROR__ACTIONTYPE = 'DISPLAY_EROR';
const DISMISS_ERROR__ACTIONTYPE = 'DISMISS_ERROR';

const ERROR_TIMEOUT_MS = 3000;

function displayError(error) {
    return {
        type: DISPLAY_ERROR__ACTIONTYPE,
        displayErrorData: {error},
    };
}

export function dismissError(error) {
    return {
        type: DISMISS_ERROR__ACTIONTYPE,
        dismissErrorData: {error},
    };
}

export function flashError(error) {
    return dispatch => {
        dispatch(displayError(error));
        setTimeout(() => {
            dispatch(dismissError(error));
        }, ERROR_TIMEOUT_MS);
    };
}
