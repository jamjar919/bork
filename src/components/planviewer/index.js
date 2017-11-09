import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Graph from '../../components/graph';

import { updateCurrentGraphAction } from '../../actions';

// eslint-disable-next-line react/prefer-stateless-function
class PlanViewer extends React.Component {

    componentWillMount() {
        this.fetchGraph(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            // Make a network request to load in the graph details
            this.fetchGraph(this.props.match.params.id);
        }
    }

    fetchGraph(id) {
        fetch(`http://localhost:3000/api/graphs/${id}`, {
            method: 'get',
        }).then(response => response.json()).then((response) => {
            this.props.updateGraph(response);
        });
    }

    render() {
        const id = this.props.match.params.id;
        return (
            <div className="plan">
                <Graph
                    networkID={id}
                    matrix={this.props.graph.data}
                    solution={this.props.solution}
                />
            </div>
        );
    }
}

PlanViewer.propTypes = {
    match: PropTypes.shape(Object).isRequired,
    updateGraph: PropTypes.func.isRequired,
    graph: PropTypes.shape(Object).isRequired,
    // graphId: PropTypes.string.isRequired,
    solution: PropTypes.arrayOf(Array),
};

function mapStateToProps(state) {
    return {
        graph: state.graph,
        graphId: state.graphId,
        solution: state.solution,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateGraph: updateCurrentGraphAction(dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanViewer);
