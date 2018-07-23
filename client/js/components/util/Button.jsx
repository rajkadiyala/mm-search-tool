import React from 'react';
import PropTypes from 'prop-types';

export default function Button({
    text,
    onClick,
    type,
    className,
}) {
    return <button // eslint-disable-line react/button-has-type
        className={`button ${className || ''}`}
        onClick={onClick}
        type={type || 'button'}
    >
        {text}
    </button>;
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    className: PropTypes.string,
};
