import { connect } from 'react-redux';
import React from 'react';
import Graph from '../../components/graph';

// eslint-disable-next-line react/prefer-stateless-function
class Home extends React.Component {

    render() {
        return (
            <div className="col-md-9">
                <Graph
                    networkID="test"
                    className="col-md-9"
                    matrix={
                    [[2, 2, 1, 0, 0, 0, 1, 2, 3, 0],
                    [0, 2, 3, 3, 0, 3, 2, 0, 1, 3],
                    [1, 1, 2, 0, 1, 2, 1, 1, 1, 1],
                    [2, 3, 2, 0, 1, 1, 0, 1, 2, 3],
                    [1, 1, 1, 0, 1, 1, 3, 1, 2, 3],
                    [1, 3, 2, 2, 0, 2, 3, 3, 0, 2],
                    [2, 0, 0, 3, 3, 2, 1, 2, 0, 1],
                    [2, 1, 2, 2, 0, 3, 2, 1, 1, 3],
                    [0, 0, 2, 0, 2, 3, 3, 2, 3, 1],
                    [0, 3, 1, 0, 0, 3, 0, 0, 2, 3]]
                    }
                    partition={
                    [[0, 4, 6, 7, 8], [1, 2, 3, 5, 9]]
                    }
                />
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
