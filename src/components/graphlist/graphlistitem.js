import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GraphListItem = props => (
    <li className={`graphListItem ${props.className}`}>
        <Link to={`/${props.id}`}>{props.name}</Link> - <Link to={`/${props.id}/edit`}>Edit</Link>
    </li>
);

GraphListItem.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default GraphListItem;
