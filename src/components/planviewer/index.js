import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GraphProvider from '../../containers/graphprovider';
import Graph from '../../components/graph';
import CurrentGraphControls from '../../components/currentgraphcontrols';

// eslint-disable-next-line react/prefer-stateless-function
class PlanViewer extends React.Component {

    render() {
        const id = this.props.match.params.id;
        return (
            <GraphProvider id={id}>
                <div className="plan col-md-9">
                    <CurrentGraphControls
                        id={id}
                    />
                    <div className="graphContainer">
                        <Graph
                            networkID={id}
                            matrix={this.props.graph.data}
                            partition={this.props.solution}
                        />
                    </div>
                </div>
            </GraphProvider>
        );
    }
}

PlanViewer.propTypes = {
    match: PropTypes.shape(Object).isRequired,
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

function mapDispatchToProps() {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanViewer);
