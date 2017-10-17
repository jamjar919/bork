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
                    [
                        [0, 2, 3, 0, 0],
                        [1, 0, 1, 1, 2],
                        [0, 0, 0, 0, 5],
                        [0, 4, 1, 0, 0],
                        [0, 5, 0, 0, 0],
                    ]
                    }
                />
            </div>
        );
    }
}

export default Home;
