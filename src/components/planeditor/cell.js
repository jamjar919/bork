import React from 'react';
import PropTypes from 'prop-types';
import NumericInput from 'react-numeric-input';

import CONFIG from '../../config';

function updateEdge(id, from, to, value, callback) {
    const body = new URLSearchParams(`from=${from.toString()}&to=${to.toString()}&value=${value.toString()}`);
    fetch(`${CONFIG.API.ADDRESS}/graphs/${id}`, {
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
class Cell extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            loaded: false,
            error: true,
            hasValue: false,
        };
    }

    /* eslint-disable react/no-did-mount-set-state */
    componentDidMount() {
        this.setState({ hasValue: this.props.initialValue !== 0 });
    }

    render() {
        return (
            <div className={`editCell ${this.props.className} ${this.state.id} ${this.state.loaded ? 'loaded' : ''} ${this.state.loading ? 'loading' : ''} ${this.state.hasValue ? 'hasValue' : ''}`}>
                <NumericInput
                    id={this.state.id}
                    type="number"
                    defaultValue={this.props.initialValue}
                    onChange={(value) => {
                        // eslint-disable-next-line eqeqeq
                        if (value == parseInt(value, 10)) {
                            this.setState({ loading: true });
                            updateEdge(
                                this.props.id,
                                this.props.from,
                                this.props.to,
                                value,
                                () => {
                                    this.setState({
                                        loaded: true,
                                        loading: false,
                                        hasValue: value !== 0,
                                    });
                                },
                            );
                        } else {
                            this.setState({ error: true });
                        }
                    }}
                    disabled={this.props.from === this.props.to}
                />
            </div>
        );
    }
}

Cell.defaultProps = {
    initialValue: 0,
    className: '',
};

Cell.propTypes = {
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    initialValue: PropTypes.number,
    className: PropTypes.string,
};

export default Cell;
