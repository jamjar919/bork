import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CONFIG from '../../config';

function deleteGraph(id, callback) {
    fetch(`${CONFIG.API.ADDRESS}/graphs/${id}`, {
        method: 'delete',
    }).then(response => response.json()).then((response) => {
        callback(response);
    });
}

class DeleteGraph extends React.Component {
    constructor() {
        super();
        this.state = {
            hasConfirmed: false,
        };
    }

    render() {
        return (
            <div className="deleteGraph">
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                        if (this.state.hasConfirmed) {
                            deleteGraph(this.props.graphId, (response) => {
                                if (response.success) {
                                    window.location = CONFIG.HOST;
                                }
                            });
                        } else {
                            this.setState({ hasConfirmed: true });
                        }
                    }}
                >
                    { !this.state.hasConfirmed ? 'Delete' : <span><i className="fa fa-fire" /> Confirm?</span>}
                </button>
            </div>
        );
    }
}

DeleteGraph.propTypes = {
    graphId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        graphId: state.graphId,
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteGraph);
