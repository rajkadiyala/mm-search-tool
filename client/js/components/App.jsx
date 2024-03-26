import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from './Login';
import Signup from './Signup';
import AllNeighbors from './neighbors/AllNeighbors';
import SingleNeighbor from './neighbors/SingleNeighbor';
import {getUser} from '../store';

function mapStateToProps(state) {
    return {
        isLoggedIn: !!state.user.id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUser: () => dispatch(getUser()),
    };
}

class App extends React.Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return <div className='app'>
            {this.renderRoutes()}
        </div>;
    }

    renderRoutes() {
        if (this.props.isLoggedIn) {
            return <Switch>
                <Route path='/neighbors/:id' component={SingleNeighbor} />
                <Route path='/neighbors' component={AllNeighbors} />
                <Redirect to='/neighbors' />
            </Switch>;
        } else {
            return <Switch>
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                <Redirect to='/login' />
            </Switch>;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
    fetchUser: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};
