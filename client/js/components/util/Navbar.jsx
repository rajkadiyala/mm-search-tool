import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

function renderContent(isLoggedIn, onLogout) {
    if (isLoggedIn) {
        return <div>
            <Link to='/home'>Home</Link>
            <button
                type='button'
                onClick={onLogout}
            >
                Logout
            </button>
        </div>;
    } else {
        return <div>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
        </div>;
    }
}

function Navbar({onLogout, isLoggedIn}) {
    return <div>
        <h1>MIRACLE MESSAGES</h1>
        <nav>
            {renderContent(isLoggedIn, onLogout)}
        </nav>
    </div>;
}

export default Navbar;

Navbar.propTypes = {
    onLogout: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};
