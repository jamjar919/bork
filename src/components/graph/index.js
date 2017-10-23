import React from 'react';
import PropTypes from 'prop-types';

const vis = require('../../../node_modules/vis/dist/vis.min.js');

class Graph extends React.Component {
    constructor() {
        super();
        this.state = {
            network: undefined,
            partition: undefined,
            colors: [],
        };
    }

    componentDidMount() {
        if (this.props.partition) {
            for (let i = 0; i < this.props.partition.length; i += 1) {
                this.state.colors.push(`rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`);
            }
        }
        let nodes = [];
        for (let i = 0; i < this.props.matrix.length; i += 1) {
            const n = {
                id: i,
                label: i.toString(),
            };
            if (this.props.partition) {
                for (let j = 0; j < this.props.partition.length; j += 1) {
                    if (this.props.partition[j].indexOf(i) > -1) {
                        n.color = this.state.colors[j];
                    }
                }
            }
            nodes.push(n);
        }
        nodes = new vis.DataSet(nodes);
        let edges = [];
        for (let i = 0; i < this.props.matrix.length; i += 1) {
            for (let j = 0; j < this.props.matrix.length; j += 1) {
                if (this.props.matrix[i][j] !== 0) {
                    edges.push({
                        from: i,
                        to: j,
                        label: this.props.matrix[i][j].toString(),
                    });
                }
            }
        }
        edges = new vis.DataSet(edges);
        const container = document.getElementById(this.props.networkID);
        const data = {
            nodes,
            edges,
        };
        const options = {
            edges: {
                arrows: 'to',
            },
        };
        this.state.network = new vis.Network(container, data, options);
    }

    render() {
        return (
            <div className={this.props.className}>
                <div id={this.props.networkID} />
            </div>
        );
    }
}

Graph.defaultProps = {
    className: '',
    partition: undefined,
};

Graph.propTypes = {
    networkID: PropTypes.string.isRequired,
    className: PropTypes.string,
    matrix: PropTypes.arrayOf(PropTypes.arrayOf(Number)).isRequired,
    partition: PropTypes.arrayOf(PropTypes.arrayOf(Number)),
};

export default Graph;

