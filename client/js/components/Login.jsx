import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {AuthForm} from './util';
import {login} from '../store';

function mapStateToProps(state) {
    return {
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

function Login({
    errorMessage,
    handleSubmit,
}) {
    return <AuthForm
        name='login'
        displayName='Login'
        className='login'
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
    />;
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
};
