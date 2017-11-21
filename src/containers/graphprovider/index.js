import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateCurrentGraphAction } from '../../actions';
import CONFIG from '../../config';

// eslint-disable-next-line react/prefer-stateless-function
class GraphProvider extends React.Component {
    componentWillMount() {
        this.fetchGraph(this.props.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            // Make a network request to load in the graph details
            this.fetchGraph(this.props.id);
        }
    }

    fetchGraph(id) {
        fetch(`${CONFIG.API.ADDRESS}/graphs/${id}`, {
            method: 'get',
        }).then(response => response.json()).then((response) => {
            this.props.updateGraph(response);
        });
    }

    render() {
        return (this.props.children);
    }
}

GraphProvider.propTypes = {
    id: PropTypes.string.isRequired,
    updateGraph: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        updateGraph: updateCurrentGraphAction(dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphProvider);
