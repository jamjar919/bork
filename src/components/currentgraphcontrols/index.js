import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SolutionControl from './solutioncontrol';

const CurrentGraphControls = props => (
    <div className="graphControl">
        <SolutionControl
            size={props.graph.data.length}
        />
    </div>
);

CurrentGraphControls.propTypes = {
    // id: PropTypes.string,
    graph: PropTypes.shape(Object),
};

function mapStateToProps(state) {
    return {
        id: state.graphId,
        graph: state.graph,
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentGraphControls);
