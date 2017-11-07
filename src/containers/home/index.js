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
                    [[-2, 0, 4, 6, 1, 4, 8, 4, 4, -4],
                    [7, -1, 6, 7, 1, -5, 1, -5, 5, -1],
                    [-3, 5, 8, -2, -2, -5, -5, -4, 4, -5],
                    [2, -1, -3, 6, 1, -3, 6, 7, -2, 3],
                    [8, 5, 3, 2, 4, 3, 8, 0, 0, 1],
                    [8, 8, 0, 7, -1, 6, 3, -3, 1, -5],
                    [-1, 1, 2, 4, 2, 2, 4, -5, 1, 1],
                    [-5, -2, -1, 3, 2, -5, 5, -4, 7, -3],
                    [6, -3, 0, 7, 5, 6, -3, 1, 0, 3],
                    [-4, -3, -1, -4, -1, 5, -3, 2, -3, 4]]
                    }
                    partition={
                    [[7, 8, 3, 9], [0, 6, 5], [2, 1, 4]]
                    }
                />
                <Graph
                    networkID="test-worst"
                    className="col-md-9"
                    matrix={
                    [[-2, 0, 4, 6, 1, 4, 8, 4, 4, -4],
                    [7, -1, 6, 7, 1, -5, 1, -5, 5, -1],
                    [-3, 5, 8, -2, -2, -5, -5, -4, 4, -5],
                    [2, -1, -3, 6, 1, -3, 6, 7, -2, 3],
                    [8, 5, 3, 2, 4, 3, 8, 0, 0, 1],
                    [8, 8, 0, 7, -1, 6, 3, -3, 1, -5],
                    [-1, 1, 2, 4, 2, 2, 4, -5, 1, 1],
                    [-5, -2, -1, 3, 2, -5, 5, -4, 7, -3],
                    [6, -3, 0, 7, 5, 6, -3, 1, 0, 3],
                    [-4, -3, -1, -4, -1, 5, -3, 2, -3, 4]]
                    }
                    partition={
                    [[6, 0, 2, 9], [5, 1, 7], [8, 3, 4]]
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
