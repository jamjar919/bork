import { connect } from 'react-redux';
import React from 'react';
// import Graph from '../../components/graph';
import GraphList from '../../components/graphlist';

// eslint-disable-next-line react/prefer-stateless-function
class Home extends React.Component {

    render() {
        return (
            <div className="home">
                <GraphList />
            </div>
        );
    }
}

function mapStateToProps(state) {
    // gets the state from redux
    return {
        example: state.example,
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
