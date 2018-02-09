import React from 'react';
// import PropTypes from 'prop-types';
import FormElement from '../../containers/formelement';
import Alert from '../../containers/alert';

import CONFIG from '../../config';

const $ = require('jquery');

function addNewGraph(name, size, owner, callback) {
    fetch(`${CONFIG.API.ADDRESS}/graphs`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(`name=${name}&size=${size}&owner=${owner}`),
    }).then(response => response.json()).then((response) => {
        callback(response);
    });
}

// eslint-disable-next-line react/prefer-stateless-function
class NewGraphForm extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    render() {
        return (
            <div className="newGraphForm form-group">
                {
                    this.state.error ?
                        <Alert
                            type="danger"
                            message="Please fill out all fields"
                            onDismiss={() => { this.setState({ error: false }); }}
                        />
                    : ''
                }
                <FormElement
                    name="graphname"
                    label="Graph Name"
                    placeholder="My Awesome Table"
                />
                <FormElement
                    name="graphsize"
                    label="Graph Size"
                    type="number"
                    placeholder="5"
                    min="2"
                />
                <FormElement
                    name="graphowner"
                    label="Owner"
                    placeholder="James"
                />
                <button
                    onClick={() => {
                        const name = $('#graphname').val();
                        const size = $('#graphsize').val();
                        const owner = $('#graphowner').val();
                        if (name.length > 0 && parseInt(size, 10) > 0 && owner.length > 0) {
                            addNewGraph(name, size, owner, (response) => {
                                /* eslint-disable no-underscore-dangle */
                                const id = response._id;
                                // Redirect to graph page
                                window.location = `${CONFIG.HOST}/${id}/edit`;
                            });
                        } else {
                            this.setState({ error: true });
                        }
                    }}
                >
                    Create
                </button>
            </div>
        );
    }
}

export default NewGraphForm;
