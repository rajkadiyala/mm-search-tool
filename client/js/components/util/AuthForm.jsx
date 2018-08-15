import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

function renderField(name, displayName, errorMessage) {
    const inputClassName = errorMessage ? 'input is-danger' : 'input';
    return <div className='field'>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label className='label' htmlFor={name}>
            {displayName}
        </label>
        <input
            className={inputClassName}
            placeholder={displayName}
            name={name}
            type={name}
        />
    </div>;
}

function renderError(errorMessage) {
    if (errorMessage) {
        return <div className='login-error'>
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
            {renderField('email', 'Email', errorMessage)}
            {renderField('password', 'Password', errorMessage)}
            <div className='navigation'>
                <Button text={displayName} type='submit' />
                {renderError(errorMessage)}
            </div>
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
