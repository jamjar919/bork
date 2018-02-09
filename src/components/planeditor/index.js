import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import GraphProvider from '../../containers/graphprovider';
import Row from './row';
import Cell from './cell';

import CONFIG from '../../config';

// eslint-disable-next-line react/prefer-stateless-function
class PlanEditor extends React.Component {

    render() {
        const id = this.props.match.params.id;
        const matrix = [];
        const names = this.props.graph.names || [];
        const labels = [];
        for (let i = 0; i < this.props.graph.data.length; i += 1) {
            labels.push(<div key={i} className="editCell">{names[i] || i.toString()}</div>);
        }
        matrix.push(<Row cells={labels} key={-1} className="matrixLabels" />);
        for (let i = 0; i < this.props.graph.data.length; i += 1) {
            const cells = [];
            for (let j = 0; j < this.props.graph.data[i].length; j += 1) {
                cells.push(
                    <Cell
                        key={i.toString() + j.toString()}
                        from={i}
                        to={j}
                        id={id}
                        initialValue={this.props.graph.data[i][j]}
                    />,
                );
            }
            matrix.push(<Row name={names[i] || i.toString()} cells={cells} key={i} />);
        }
        return (
            <GraphProvider id={id}>
                <div className="planeditWrapper">
                    <h2>Edit Graph {this.props.graph.name}</h2>
                    <a href={`${CONFIG.HOST}/${id}`}>Back to view</a>
                    <div className="planedit">
                        {matrix}
                    </div>
                </div>
            </GraphProvider>
        );
    }
}

PlanEditor.propTypes = {
    match: PropTypes.shape(Object).isRequired,
    graph: PropTypes.shape(Object).isRequired,
};

function mapStateToProps(state) {
    return {
        graph: state.graph,
        graphId: state.graphId,
        solution: state.solution,
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanEditor);
