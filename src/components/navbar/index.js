import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleMenuAction } from '../../actions';


const NavbarItem = props => (
    <li className="list-group-item list-group-item-action">
        { props.children }
    </li>
);

NavbarItem.propTypes = {
    children: PropTypes.element,
};

// eslint-disable-next-line react/prefer-stateless-function
class Navbar extends React.Component {

    render() {
        return (
            <div className={`column-left ${this.props.menuMinimised ? 'column-left-minimised' : ''}`}>
                <nav>
                    <ul className="list-group">
                        <NavbarItem><Link to="/"><i className="fa fa-home" aria-hidden="true" />{this.props.menuMinimised ? '' : 'Home'}</Link></NavbarItem>
                        <NavbarItem><Link to="/about"><i className="fa fa-question-circle" aria-hidden="true" />{this.props.menuMinimised ? '' : 'About'}</Link></NavbarItem>
                        <li className="nav-item">
                            <a className="nav-link active" onClick={() => { this.props.toggleMenu(); }}>{`${this.props.menuMinimised ? '>' : 'Minimise'}`}</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    menuMinimised: PropTypes.bool,
    toggleMenu: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        menuMinimised: state.menuMinimised,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleMenu: toggleMenuAction(dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
