import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
class Topbar extends React.Component {

    render() {
        return (
            <div className="navbar navbar-dark bg-primary">
                <Link to="/" className="navbar-brand">Parter</Link>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#login">Login</a></li>
                </ul>
            </div>
        );
    }
}

export default Topbar;
