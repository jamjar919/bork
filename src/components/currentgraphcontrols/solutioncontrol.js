/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'rc-slider/assets/index.css';

import PartitionSizer from './partitionsizer';
import { updateCurrentSolutionAction } from '../../actions';
import CONFIG from '../../config';

class SolutionControl extends React.Component {
    constructor() {
        super();
        this.state = {
            optionsOpen: false,
            partitions: 2,
            sizes: [],
            method: 'coarsegrow',
            loadingSolution: false,
            loadedSolution: false,
            errorLoadingSolution: false,
            errorMessage: '',
        };
    }

    getGraphSolution(id, method) {
        this.setState({
            loadingSolution: true,
            loadedSolution: false,
            errorLoadingSolution: false },
            () => {
                let sizesString = '';
                if (this.state.sizes.length > 0) {
                    for (let i = 0; i < this.state.sizes.length; i += 1) {
                        sizesString += `&sizes[]=${this.state.sizes[i]}`;
                    }
                }
                const dest = `${CONFIG.API.ADDRESS}/graphs/${id}/solve?method=${method}&n=${this.state.partitions}${sizesString}`;
                fetch(dest, {
                    method: 'get',
                }).then(response => response.json()).then((response) => {
                    if (!response.error) {
                        this.props.updateGraphSolution(response.solution);
                        this.setState({ loadingSolution: false }, () => {
                            this.setState({ loadedSolution: true });
                        });
                    } else {
                        this.setState({
                            errorLoadingSolution: true,
                            loadingSolution: false,
                            errorMessage: response.error,
                        });
                    }
                });
            },
        );
    }

    render() {
        const partitionTotal = this.state.sizes.reduce((a, b) => a + b, 0);
        const partitionSizes = [];
        for (let i = 0; i < this.state.sizes.length; i += 1) {
            partitionSizes.push(<button key={i} type="button" className="btn btn-secondary">{this.state.sizes[i]}</button>);
        }
        const options = (
            <div className="options card bg-light">
                <div className="card-header">Options</div>
                <div className="card-body">
                    <div className="form-group row solution-method-select">
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <button
                                className={`btn btn-primary ${this.state.method === 'brute' ? 'active' : ''}`}
                                onClick={() => { this.setState({ method: 'brute' }); }}
                            >
                                Brute Force
                            </button>
                            <button
                                className={`btn btn-primary ${this.state.method === 'fill' ? 'active' : ''}`}
                                onClick={() => { this.setState({ method: 'fill' }); }}
                            >
                                Graph Filling
                            </button>
                            <button
                                className={`btn btn-primary ${this.state.method === 'coarsegrow' ? 'active' : ''}`}
                                onClick={() => { this.setState({ method: 'coarsegrow' }); }}
                            >
                                Coarse/Grow
                            </button>
                            <button
                                className={`btn btn-primary ${this.state.method === 'spectral' ? 'active' : ''}`}
                                onClick={() => { this.setState({ method: 'spectral' }); }}
                            >
                                Spectral
                            </button>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="partitionNumber" className="col-sm-6 col-form-label">Number of partitions: </label>
                        <input
                            name="partitionNumber"
                            className="col-sm-6"
                            type="number"
                            min="2"
                            max="10"
                            defaultValue="2"
                            onInput={(e) => {
                                this.setState({ partitions: parseInt(e.target.value, 10) });
                            }}
                        />
                    </div>
                    <PartitionSizer
                        size={this.props.size}
                        partitions={this.state.partitions}
                        callback={(partitions, sizes) => { this.setState({ sizes }); }}
                    />
                    <div className="btn-toolbar partition-sizes-indicator">
                        <div className="btn-group mr-2" role="group">
                            {partitionSizes}
                        </div>
                        <div className="btn-group" role="group">
                            <button type="button" className={`btn btn-secondary ${partitionTotal === this.props.size ? 'btn-success' : 'btn-danger'}`}>{ partitionTotal }</button>
                        </div>
                    </div>
                </div>
            </div>
        );
        const errorMessage = (
            <div className="alert alert-danger">
                <strong>Error Retrieving Solution:</strong> { this.state.errorMessage }
            </div>
        );
        return (
            <div>
                <div className="solve-buttons">
                    <button
                        type="button"
                        className={`btn solve-button btn-lg ${this.state.loadedSolution ?
                             'btn-success' : 'btn-primary'} ${this.state.loadingSolution ?
                             'btn-warning' : ''} ${this.state.errorLoadingSolution ?
                             'btn-danger' : ''}`}
                        onClick={() => {
                            this.getGraphSolution(this.props.graphId, this.state.method);
                        }}
                    >
                        Solve
                        { this.state.loadingSolution ? <span className="fa fa-tasks heartbeat" /> : '' }
                        { this.state.loadedSolution ? <span className="fa fa-check" /> : '' }
                    </button>
                    <button
                        type="button"
                        className={`btn btn-lg ${this.state.optionsOpen ? 'btn-info' : 'btn-primary'}`}
                        onClick={() => { this.setState({ optionsOpen: !this.state.optionsOpen }); }}
                    >
                        Options
                    </button>
                </div>
                {
                    (this.state.errorLoadingSolution ? errorMessage : '')
                }
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
    size: PropTypes.number.isRequired,
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

