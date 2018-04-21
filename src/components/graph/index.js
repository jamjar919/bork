import React from 'react';
import PropTypes from 'prop-types';

const vis = require('../../../node_modules/vis/dist/vis.min.js');

class Graph extends React.Component {
    constructor() {
        super();
        this.state = {
            network: undefined,
            nodes: undefined,
            edges: undefined,
            partition: undefined,
            intersectingEdges: undefined,
            colors: [],
            hideEdges: false,
        };
    }

    componentDidMount() {
        this.renderGraph();
        this.getIntersectingEdgeIds();
    }

    componentDidUpdate(prevProps) {
        if (
            (prevProps.matrix !== this.props.matrix) ||
            (prevProps.partition !== this.props.partition)
        ) {
            console.log(`rerendering graph ${this.props.networkID}`);
            this.renderGraph();
        }
        if (this.props.partition) {
            console.log(`retrieving intersecting edges for graph ${this.props.networkID}`);
            const ids = this.state.intersectingEdges;
            for (let i = 0; i < ids.length; i += 1) {
                this.state.edges.update({ id: ids[i], hidden: this.state.hideEdges });
            }
        }
    }

    componentWillUnmount() {
        this.state.network.destroy();
        this.setState({
            network: undefined,
            nodes: undefined,
            edges: undefined,
            partition: undefined,
            intersectingEdges: undefined,
            colors: [],
            hideEdges: false,
        });
    }

    getIntersectingEdgeIds() {
        if (this.props.partition) {
            const intersectingEdges = [];
            const ids = this.state.edges.getIds();
            for (let i = 0; i < ids.length; i += 1) {
                const edge = this.state.edges.get(ids[i]);
                for (let j = 0; j < this.props.partition.length; j += 1) {
                    const group = this.props.partition[j];
                    for (let a = 0; a < group.length; a += 1) {
                        if (
                            (group.indexOf(edge.from) > -1) &&
                            (!(group.indexOf(edge.to) > -1))
                        ) {
                            intersectingEdges.push(ids[i]);
                        }
                    }
                }
            }
            this.setState({ intersectingEdges });
        }
    }

    renderGraph() {
        if (this.props.partition) {
            for (let i = 0; i < this.props.partition.length; i += 1) {
                this.state.colors.push(`rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`);
            }
            this.props.colorCallback(this.state.colors);
        }
        const nodes = [];
        for (let i = 0; i < this.props.matrix.length; i += 1) {
            const n = {
                id: i,
                label: this.props.names[i] ? this.props.names[i] : i.toString(),
                font: {
                    color: this.props.partition.length > 0 ? '#FFF' : '#343434',
                },
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
        this.state.nodes = new vis.DataSet(nodes);
        const edges = [];
        for (let i = 0; i < this.props.matrix.length; i += 1) {
            for (let j = 0; j < this.props.matrix.length; j += 1) {
                if (this.props.matrix[i][j] !== 0) {
                    const e = {
                        from: i,
                        to: j,
                        label: this.props.matrix[i][j].toString(),
                    };
                    edges.push(e);
                }
            }
        }
        if (this.props.partition) {
            for (let i = 0; i < edges.length; i += 1) {
                const edge = edges[i];
                for (let j = 0; j < this.props.partition.length; j += 1) {
                    const group = this.props.partition[j];
                    for (let a = 0; a < group.length; a += 1) {
                        if (
                            (group.indexOf(edge.from) > -1) &&
                            (!(group.indexOf(edge.to) > -1))
                        ) {
                            edge.dashes = true;
                            edge.length = 500;
                            if (this.state.hideEdges) {
                                edge.hidden = true;
                            }
                        }
                    }
                }
            }
        }
        this.state.edges = new vis.DataSet(edges);
        const container = document.getElementById(this.props.networkID);
        const data = {
            nodes: this.state.nodes,
            edges: this.state.edges,
        };
        const options = {
            edges: {
                arrows: 'to',
            },
        };
        this.state.network = new vis.Network(container, data, options);
        this.state.network.on('selectNode', (e) => {
            if (this.state.hideEdges) {
                for (let i = 0; i < this.state.intersectingEdges.length; i += 1) {
                    const id = this.state.intersectingEdges[i];
                    this.state.edges.update({ id, hidden: true });
                }
                for (let i = 0; i < e.edges.length; i += 1) {
                    const id = e.edges[i];
                    this.state.edges.update({ id, hidden: false });
                }
            }
        });
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
    names: [],
    colorCallback: () => {},
};

Graph.propTypes = {
    networkID: PropTypes.string.isRequired,
    className: PropTypes.string,
    matrix: PropTypes.arrayOf(PropTypes.arrayOf(Number)).isRequired,
    partition: PropTypes.arrayOf(PropTypes.arrayOf(Number)),
    names: PropTypes.arrayOf(PropTypes.string),
    colorCallback: PropTypes.func,
};

export default Graph;

