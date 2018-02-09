import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/href-no-hash */

const Alert = props => (
    <div className={`alert alert-${props.type} alert-dismissable`}>
        <a href="#" className="close" aria-label="close" onClick={props.onDismiss}>&times;</a>
        {props.title ? <strong>{props.title}</strong> : ''}{props.message}
    </div>
);

Alert.defaultProps = {
    type: '',
    title: '',
    message: '',
    onDismiss: () => {},
};

Alert.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    onDismiss: PropTypes.func,
};

export default Alert;
