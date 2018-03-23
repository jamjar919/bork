import React from 'react';
import PropTypes from 'prop-types';

import ListEditorItem from './listeditoritem';
import ListRenderer from './listrenderer';

const $ = require('jquery');
const uuidv4 = require('uuid/v4');

class ListEditor extends React.Component {
    constructor(props) {
        super();
        this.state = {
            pageSize: 10,
            searchTerm: '',
        };
        this.props = props;
        this.state.items = this.getItems();
        this.state.itemElements = this.getItemElements();
    }

    componentWillReceiveProps(nextProps) {
        const items = this.getItems(nextProps.graph);
        this.setState({
            items,
            itemElements: this.getItemElements(items),
        });
    }

    getItems(graph = this.props.graph) {
        const items = [];
        if (graph.data.length > 0) {
            for (
                let i = 0;
                i < graph.data.length;
                i += 1
            ) {
                if (
                    graph.data[i] &&
                    (
                        (this.state.searchTerm === '') ||
                        (`${i.toString()}${graph.names[i]}`.toLowerCase().search(this.state.searchTerm.toLowerCase()) !== -1)
                    )
                ) {
                    items.push(
                        {
                            id: i,
                            name: graph.names[i],
                            row: graph.data[i],
                        },
                    );
                }
            }
        }
        return items;
    }

    getItemElements(items = this.state.items) {
        const itemElements = [];
        for (
            let i = 0;
            i < items.length;
            i += 1
        ) {
            itemElements.push(
                <ListEditorItem key={uuidv4()} item={items[i]} />,
            );
        }
        return itemElements;
    }

    updateItemList() {
        this.setState({
            items: this.getItems(),
        }, () => {
            this.setState({
                itemElements: this.getItemElements(),
            });
        });
    }

    render() {
        return (
            <div className="list-editor searchbox-wrapper">
                <div className="input-group add-on" key="-1">
                    <input
                        className="form-control"
                        placeholder="Search"
                        name="search"
                        id="searchbox-participants"
                        type="text"
                        onKeyUp={() => {
                            this.setState({
                                searchTerm: $('#searchbox-participants').val(),
                                pageNum: 0,
                            },
                            () => {
                                this.updateItemList();
                            },
                            );
                        }}
                    />
                </div>
                <ListRenderer
                    items={this.state.itemElements}
                    pageSize={this.state.pageSize}
                />
            </div>
        );
    }
}

ListEditor.propTypes = {
    graph: PropTypes.shape(Object).isRequired,
};

export default ListEditor;
