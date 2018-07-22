import {connect} from 'react-redux';

import {AuthForm} from '../util';
import {login} from '../../store';

function mapStateToProps(state) {
    return {
        name: 'login',
        displayName: 'Login',
        errorMessage: state.user.errorMessage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit(event) {
            event.preventDefault();
            const email = event.target.email.value;
            const password = event.target.password.value;
            dispatch(login(email, password, 'login'));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
