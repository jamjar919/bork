import React from 'react';
import PropTypes from 'prop-types';

import CONFIG from '../../config';

const GraphListItem = props => (
    <li className={`graphListItem ${props.className}`}>
        <a href={`${CONFIG.HOST}/${props.id}`}>{props.name}</a>
    </li>
);

GraphListItem.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default GraphListItem;
