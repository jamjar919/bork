import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class CollapsableCard extends React.Component {

    render() {
        return (
            <div className={`card collapsable-card ${this.props.className} ${this.props.collapse ? 'card-collapsed' : ''}`}>
                <h3 className="card-header">{this.props.parentCollapsed ? '' : this.props.title}<a onClick={this.props.onMinimise} className={`fa fa-${this.props.collapse ? this.props.icon : 'minus-square'} collapse-card-button`} /></h3>
                <div className="card-body-collapse">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

CollapsableCard.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string,
    ]),
    title: PropTypes.string,
    className: PropTypes.string,
    icon: PropTypes.string,
    parentCollapsed: PropTypes.bool,
    collapse: PropTypes.bool,
    onMinimise: PropTypes.func,
};

CollapsableCard.defaultProps = {
    title: '',
    className: '',
    icon: 'expand',
    parentCollapsed: false,
    collapse: false,
    onMinimise: () => {},
};

export default CollapsableCard;
