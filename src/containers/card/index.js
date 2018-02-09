import React from 'react';
import PropTypes from 'prop-types';

const Card = props => (
    <div className={`card ${props.className}`}>
        <h3 className="card-header">{props.title}</h3>
        {props.children}
    </div>
);

Card.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
    title: PropTypes.string,
    className: PropTypes.string,
};

Card.defaultProps = {
    title: '',
    className: '',
};

export default Card;
