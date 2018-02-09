import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateCurrentSolutionAction } from '../../actions';
import CONFIG from '../../config';

class SolutionControl extends React.Component {
    constructor() {
        super();
        this.state = {
            optionsOpen: false,
        };
    }

    getGraphSolution(id, method) {
        fetch(`${CONFIG.API.ADDRESS}/graphs/${id}/solve?method=${method}`, {
            method: 'get',
        }).then(response => response.json()).then((response) => {
            this.props.updateGraphSolution(response.solution);
        });
    }

    render() {
        const options = (
            <div className="options">
                dsadsakd
            </div>
        );
        return (
            <div>
                <button
                    onClick={() => {
                        this.getGraphSolution(this.props.graphId, 'coarsegrow');
                    }}
                >
                    Solve
                </button>
                <button
                    onClick={() => { this.setState({ optionsOpen: !this.state.optionsOpen }); }}
                >
                    Options
                </button>
                {
                    (this.state.optionsOpen) ? options : ''
                }
            </div>
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

