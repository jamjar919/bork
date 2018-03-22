import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Name from '../namelist/name';
import Cell from './cell';

const $ = require('jquery');

class ListEditorItem extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
        };
    }

    /* eslint-disable no-underscore-dangle */

    componentDidUpdate() {
        if (this.state.open) {
            $(() => {
                $('[data-toggle="tooltip"]').tooltip();
            });
        }
    }

    render() {
        const cells = [];
        const i = this.props.item.id;
        for (let j = 0; j < this.props.graph.data[i].length; j += 1) {
            cells.push(
                <div
                    key={i.toString() + j.toString()}
                    className=""
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={`${this.props.graph.names[i]} -> ${this.props.graph.names[j]} (Node ${j.toString()})`}
                >
                    <Cell
                        from={i}
                        to={j}
                        id={this.props.graph._id}
                        initialValue={this.props.graph.data[i][j]}
                    />
                </div>,
            );
        }
        const rowHeader = (
            <div className="list-editor-item-row-header">
                <hr />
                <strong>Edit node data</strong>
            </div>
        );

        return (
            /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
            <div
                className={`list-editor-item list-group-item ${this.state.open ? 'list-editor-item-open' : ''}`}
                onClick={() => {
                    this.setState({ open: !this.state.open });
                }}
            >
                <Name
                    name={this.props.item.name}
                    id={this.props.item.id}
                    graphId={this.props.graph._id}
                    lockEditingTo={this.state.open}
                />
                { this.state.open ? rowHeader : '' }
                <div
                    className={`list-editor-row ${this.state.open ? 'list-editor-row-open' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {cells}
                </div>
            </div>
        );
    }
}

ListEditorItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        row: PropTypes.arrayOf(PropTypes.number),
    }).isRequired,
    graph: PropTypes.shape(Object).isRequired,
};

function mapStateToProps(state) {
    return {
        graph: state.graph,
    };
}

export default connect(mapStateToProps)(ListEditorItem);
