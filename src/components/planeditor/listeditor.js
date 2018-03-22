import React from 'react';
import PropTypes from 'prop-types';

import ListEditorItem from './listeditoritem';

const $ = require('jquery');
const uuidv4 = require('uuid/v4');

class ListEditor extends React.Component {
    constructor(props) {
        super();
        this.state = {
            pageNum: 0,
            pageSize: 10,
            searchTerm: '',
        };
        this.props = props;
        this.state.items = this.getItems();
        this.state.itemElements = this.getItemElements();
        this.state.pageElements = this.getPageElements();
    }

    componentWillReceiveProps(nextProps) {
        const items = this.getItems(nextProps.graph);
        this.setState({
            items,
            itemElements: this.getItemElements(items),
            pageElements: this.getPageElements(items),
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

    getPageElements(items = this.state.items) {
        const pages = [];
        for (let i = 0; i < Math.floor(items.length / this.state.pageSize); i += 1) {
            pages.push(
                <li key={i} className={`page-item ${i === this.state.pageNum ? 'active' : ''}`}>
                    <a
                        className="page-link"
                        onClick={() => {
                            this.setState({ pageNum: i }, () => {
                                this.setState({
                                    pageElements: this.getPageElements(),
                                });
                            });
                        }}
                    >{(i + 1).toString()}</a>
                </li>,
            );
        }
        return pages;
    }

    updateItemList() {
        this.setState({
            items: this.getItems(),
        }, () => {
            this.setState({
                itemElements: this.getItemElements(),
                pageElements: this.getPageElements(),
            });
        });
    }

    render() {
        const startIndex = this.state.pageNum * this.state.pageSize;
        const endIndex = Math.min(startIndex + this.state.pageSize, this.state.items.length);
        const itemElements = this.state.itemElements.slice(startIndex, endIndex);

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
                <div className="search-information">
                    <small className="text-muted">Displaying items {`${startIndex.toString()} to ${Math.max(endIndex - 1, 0).toString()}`}</small>
                    <small className="text-muted pull-right">{this.state.items.length.toString()} items total</small>
                </div>
                <div className="list-group">
                    {itemElements}
                </div>
                <div className="pagination-wrapper">
                    <ul className="pagination">
                        {this.state.pageElements}
                    </ul>
                </div>
            </div>
        );
    }
}

ListEditor.propTypes = {
    graph: PropTypes.shape(Object).isRequired,
};

export default ListEditor;
