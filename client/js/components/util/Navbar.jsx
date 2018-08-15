import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import Button from './Button';

function renderContent(isLoggedIn, onLogout) {
    if (isLoggedIn) {
        return <Button
            text='Logout'
            onClick={onLogout}
        />;
    } else {
        return null;
    }
}

function renderLogo() {
    return <NavLink to='/home' className='navbar-item'>
        <img src='/assets/logo.png' alt='Miracle Messages' />
    </NavLink>;
}

function Navbar({isLoggedIn, onLogout}) {
    return <nav className='navbar has-shadow is-spaced'>
        <div className='navbar-brand'>
            {renderLogo()}
            {renderContent(isLoggedIn, onLogout)}
        </div>
        <div className='navbar-end'>
            <div className='navbar-item'>
                Volunteer Search Tool
            </div>
        </div>
    </nav>;
}

export default Navbar;

Navbar.propTypes = {
    onLogout: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};
