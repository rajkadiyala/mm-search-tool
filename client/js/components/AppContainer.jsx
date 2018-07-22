import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {logout as logoutAction} from '../store';
import {Navbar} from './util';

function mapStateToProps(state) {
    return {isLoggedIn: !!state.user.id};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logout: logoutAction}, dispatch);
}

function AppContainer({
    App,
    location,
    isLoggedIn,
    logout,
}) {
    return <div>
        <Navbar
            onLogout={logout}
            isLoggedIn={isLoggedIn}
            location={location}
        />
        <App location={location} />
    </div>;
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));

AppContainer.propTypes = {
    App: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        key: PropTypes.string,
    }),
};
