import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CONFIG from '../../config';

const $ = require('jquery');

function updateName(id, graphId, name, callback) {
    const body = new URLSearchParams(`id=${id}&name=${name}`);
    fetch(`${CONFIG.API.ADDRESS}/graphs/${graphId}/names/`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    }).then(response => response.json()).then((response) => {
        callback(response);
    });
}

// eslint-disable-next-line react/prefer-stateless-function
class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            editing: false,
            name: this.props.name,
            timerId: 0,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            (nextProps !== this.props)
            || (nextState.name !== this.state.name)
            || (nextState.editing !== this.state.editing)
        ) {
            return true;
        }
        return false;
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.editing) {
            this.newTimer();
        }
    }

    componentDidUpdate() {
        if (this.state.editing) {
            $(() => {
                $('[data-toggle="tooltip"]').tooltip();
            });
        }
    }

    newTimer() {
        clearTimeout(this.state.timerId);
        const a = setTimeout(() => {
            this.setState({ editing: false });
        }, 5000);
        this.setState({
            timerId: a,
        });
    }

    keyWrapper(e, callback) {
        this.newTimer();
        if (e.keyCode === 13) {
            updateName(
                this.props.id,
                this.props.graphId,
                e.target.value,
                callback,
            );
        }
    }

    render() {
        const editbox = (
            <div className="input-group edit-name-group">
                <input
                    type="text"
                    placeholder={this.state.name}
                    defaultValue={this.state.name}
                    className="form-control edit-name-box"
                    onKeyUp={(e) => {
                        this.keyWrapper(
                            e,
                            (response) => {
                                this.setState({
                                    name: response.names[this.props.id],
                                    editing: false,
                                });
                            },
                        );
                    }}
                />
                <div className="input-group-append">
                    <span
                        className="input-group-text"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Press the enter key to submit the change"
                    >
                        <i className="fa fa-level-down" />
                    </span>
                </div>
            </div>
        );
        const standard = (
            <span><i className="fa fa-edit name-edit-icon" /> {this.state.name}</span>
        );
        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
        return (
            <li
                key={this.props.id}
                className="list-group-item d-flex justify-content-between align-items-center name-list-item"
                onClick={() => {
                    this.setState({ editing: true });
                }}
            >
                {
                    this.state.editing ? editbox : standard
                }
                <span className="badge badge-primary badge-pill">{this.props.id}</span>
            </li>
        );
    }
}

Name.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    graphId: PropTypes.string.isRequired,
};

Name.defaultProps = {
    name: 'Unnamed',
};


function mapStateToProps(state) {
    return {
        graphId: state.graphId,
    };
}

export default connect(mapStateToProps)(Name);
