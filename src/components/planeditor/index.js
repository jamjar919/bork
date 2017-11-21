import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GraphProvider from '../../containers/graphprovider';

// eslint-disable-next-line react/prefer-stateless-function
class PlanEditor extends React.Component {

    render() {
        const id = this.props.match.params.id;
        return (
            <GraphProvider id={id}>
                <div className="planedit col-md-9">
                    {JSON.stringify(this.props.graph)}
                </div>
            </GraphProvider>
        );
    }
}

PlanEditor.propTypes = {
    match: PropTypes.shape(Object).isRequired,
    graph: PropTypes.shape(Object).isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(PlanEditor);
