import React from 'react';
import PropTypes from 'prop-types';

const FormElement = props => (
    <div className={`form-group ${props.className}`}>
        <label htmlFor={props.name}>{props.label}</label>
        <input type={props.type} id={props.name} name={props.name} className={`form-control ${props.inputClassName}`} placeholder={props.placeholder} min={props.min} max={props.max} />
    </div>
);

FormElement.defaultProps = {
    className: '',
    name: '',
    type: 'text',
    label: 'Element Label',
    inputClassName: '',
    placeholder: '',
    min: '',
    max: '',
};

FormElement.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    inputClassName: PropTypes.string,
    placeholder: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
};

export default FormElement;
