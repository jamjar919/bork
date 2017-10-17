import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Navbar from '../components/navbar';
import Home from './home';
import About from './about';
import reducer from '../reducers';
import '../style/main.scss';

/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

// eslint-disable-next-line react/prefer-stateless-function
class Root extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="row">
                        <Navbar
                            className="col-3"
                        />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default Root;
