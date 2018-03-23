import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ListEditor from './listeditor';
import GraphProvider from '../../containers/graphprovider';
import Row from './row';
import Cell from './cell';

import CONFIG from '../../config';

// eslint-disable-next-line react/prefer-stateless-function
class PlanEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            editMode: 'list',
        };
    }

    switchEditMode() {
        if (this.state.editMode === 'list') {
            this.setState({ editMode: 'matrix' });
        } else {
            this.setState({ editMode: 'list' });
        }
    }

    render() {
        // Render matrix
        const id = this.props.match.params.id;
        let editor = [];
        if (
            (CONFIG.EDIT.MAX_MATRIX_SIZE > this.props.graph.data.length) &&
            (this.state.editMode === 'matrix')
        ) {
            const names = this.props.graph.names || [];
            const labels = [];
            for (let i = 0; i < this.props.graph.data.length; i += 1) {
                labels.push(<div key={i} className="editCell">{names[i] || i.toString()}</div>);
            }
            editor.push(<Row cells={labels} key={-1} className="matrixLabels" />);
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
                editor.push(<Row name={names[i] || i.toString()} cells={cells} key={i} />);
            }
        } else if (this.state.editMode === 'list') {
            editor = (
                <ListEditor
                    graph={this.props.graph}
                />
            );
        }
        const switchEditModeButton = CONFIG.EDIT.MAX_MATRIX_SIZE > this.props.graph.data.length ?
            <a onClick={() => { this.switchEditMode(); }}>Switch Edit Mode</a> : <span />;
        return (
            <GraphProvider id={id}>
                <div className="planeditWrapper content">
                    <h3>{this.props.graph.name}<small className="text-muted"> Editing {switchEditModeButton}</small> <small className="text-muted pull-right"><Link to={`/${id}`}>View</Link></small></h3>
                    <div className="planedit">
                        {editor}
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
