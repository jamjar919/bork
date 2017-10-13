import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
class Navbar extends React.Component {

    render() {
        return (
            <div className="col-md-3">
                <nav>
                    <ul>
                        <li><Link to="/"><i className="fa fa-home" aria-hidden="true" /> Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Navbar;
