import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateCurrentSolutionAction } from '../../actions';
import CONFIG from '../../config';

class SolutionControl extends React.Component {

    getGraphSolution(id, method) {
        fetch(`${CONFIG.API.ADDRESS}/graphs/${id}/solve?method=${method}`, {
            method: 'get',
        }).then(response => response.json()).then((response) => {
            this.props.updateGraphSolution(response.solution);
        });
    }

    render() {
        return (
            <button
                onClick={() => {
                    this.getGraphSolution(this.props.graphId, 'fill');
                }}
            >
                Solve
            </button>
        );
    }
}

SolutionControl.propTypes = {
    updateGraphSolution: PropTypes.func.isRequired,
    graphId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        graphId: state.graphId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateGraphSolution: updateCurrentSolutionAction(dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SolutionControl);

