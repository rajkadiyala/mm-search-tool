import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

function renderField(name, displayName, type) {
    return <div className='field'>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label className='label' htmlFor={name}>
            {displayName}
        </label>
        <input
            className='input'
            placeholder={displayName}
            name={name}
            type={type}
        />
    </div>;
}

function renderError(errorMessage) {
    if (errorMessage) {
        return <div>
            {errorMessage}
        </div>;
    } else {
        return null;
    }
}

export default function AuthForm({
    name,
    displayName,
    onSubmit,
    errorMessage,
    className,
}) {
    return <div className={className}>
        <form onSubmit={onSubmit} name={name}>
            {renderField('email', 'Email', 'text')}
            {renderField('password', 'Password', 'password')}
            <Button text={displayName} type='submit' />
            {renderError(errorMessage)}
        </form>
    </div>;
}

AuthForm.propTypes = {
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    className: PropTypes.string,
};
