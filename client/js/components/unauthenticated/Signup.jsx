import {connect} from 'react-redux';

import {AuthForm} from '../util';
import {login} from '../../store';

function mapStateToProps(state) {
    return {
        name: 'signup',
        displayName: 'Sign Up',
        errorMessage: state.user.errorMessage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit(event) {
            event.preventDefault();
            const email = event.target.email.value;
            const password = event.target.password.value;
            dispatch(login(email, password, 'signup'));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
