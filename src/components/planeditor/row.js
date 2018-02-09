import React from 'react';
import PropTypes from 'prop-types';

const Row = props => (
    <div className={`editRow ${props.className}`}>
        <div className="rowLabel">
            {props.name}
        </div>
        {props.cells}
    </div>
);

Row.defaultProps = {
    className: '',
};

Row.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.element),
    name: PropTypes.string,
    className: PropTypes.string,
};

export default Row;
