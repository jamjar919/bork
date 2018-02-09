import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class CollapsableColumn extends React.Component {

    render() {
        return (
            <div className={`collapsable-column ${this.props.className} ${this.props.collapse ? 'column-collapsed' : ''}`}>
                {this.props.children}
            </div>
        );
    }
}

CollapsableColumn.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
    className: PropTypes.string,
    collapse: PropTypes.bool,
};

CollapsableColumn.defaultProps = {
    className: '',
    collapse: false,
};

export default CollapsableColumn;
