import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from 'Components/Navbar';
import Home from './Home';
import About from './About';
import '../style/main.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Root extends React.Component {

    render() {
        return (
            <Router>
                <div className="row">
                    <Navbar
                        className="col-3"
                    />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                </div>
            </Router>
        );
    }
}

export default Root;
