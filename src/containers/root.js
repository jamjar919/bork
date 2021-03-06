import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Navbar from '../components/navbar';
import Topbar from '../components/topbar';
import Footer from '../components/footer';
import Home from './home';
import About from './about';
import PlanViewer from '../components/planviewer';
import PlanEditor from '../components/planeditor';
import reducer from '../reducers';
import '../style/main.scss';

/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

const browserHistory = Router.browserHistory;

// eslint-disable-next-line react/prefer-stateless-function
class Root extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <div>
                        <Topbar />
                        <div className="content-container">
                            <Navbar
                                className="col-3"
                            />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/about" component={About} />
                                <Route
                                    path="/:id"
                                    component={() => (
                                        <Switch>
                                            <Route exact path="/:id" component={PlanViewer} />
                                            <Route path="/:id/edit" component={PlanEditor} />
                                        </Switch>
                                    )}
                                />
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default Root;
