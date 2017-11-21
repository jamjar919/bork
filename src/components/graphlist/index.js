import React from 'react';
// import PropTypes from 'prop-types';
import GraphListItem from './graphlistitem';

import CONFIG from '../../config';

const uuidv4 = require('uuid/v4');

/* eslint-disable no-underscore-dangle */
class GraphList extends React.Component {
    constructor() {
        super();
        this.state = {
            id: uuidv4(),
            items: [],
            loaded: false,
            loading: false,
        };
    }

    componentDidMount() {
        this.fetchGraph();
    }

    fetchGraph() {
        this.setState({ loading: true }, () => {
            fetch(`${CONFIG.API.ADDRESS}/graphs/`, {
                method: 'get',
            }).then(response => response.json()).then((response) => {
                this.setState({ items: response, loading: false, loaded: true });
            });
        });
    }

    render() {
        const graphItems = [];
        for (let i = 0; i < this.state.items.length; i += 1) {
            graphItems.push(
                <GraphListItem
                    key={this.state.items[i]._id}
                    name={this.state.items[i].name}
                    id={this.state.items[i]._id}
                />,
            );
        }
        return (
            <div className="graphList" id={this.state.id}>
                {this.state.loading ? 'Loading items...' : ''}
                {this.state.loaded ?
                    <ul>
                        {graphItems}
                    </ul>
                : 'No items loaded'}
            </div>
        );
    }
}

GraphList.propTypes = {
};

export default GraphList;
