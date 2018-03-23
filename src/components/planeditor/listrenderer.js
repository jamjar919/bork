import React from 'react';
import PropTypes from 'prop-types';

class ListRenderer extends React.Component {
    constructor() {
        super();
        this.state = {
            pageNum: 0,
            pages: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            pages: this.getItemPages(nextProps.items),
            pageNum: 0,
        });
    }

    getItemPages(items = this.props.items) {
        const pages = [];
        for (
            let currentPageNum = 0;
            currentPageNum < Math.ceil(items.length / this.props.pageSize);
            currentPageNum += 1
        ) {
            const startIndex = currentPageNum * this.props.pageSize;
            const endIndex = Math.min(startIndex + this.props.pageSize, items.length);
            const page = items.slice(startIndex, endIndex);
            pages.push(page);
        }
        return pages;
    }

    getPaginationElements(activePage = this.state.pageNum) {
        const pages = [];
        for (let i = 0; i < Math.ceil(this.props.items.length / this.props.pageSize); i += 1) {
            pages.push(
                <li key={i} className={`page-item ${i === activePage ? 'active' : ''}`}>
                    <a
                        className="page-link"
                        onClick={() => {
                            this.setState({ pageNum: i });
                        }}
                    >{(i + 1).toString()}</a>
                </li>,
            );
        }
        return pages;
    }

    render() {
        const startIndex = this.state.pageNum * this.props.pageSize;
        const endIndex = Math.min(startIndex + this.props.pageSize, this.props.items.length);
        const itemElements = this.state.pages[this.state.pageNum];
        const pages = this.getPaginationElements();
        return (
            <div className="listViewWrapper">
                <div className="search-information">
                    <small className="text-muted">Displaying items {`${startIndex.toString()} to ${Math.max(endIndex - 1, 0).toString()}`}</small>
                    <small className="text-muted pull-right">{this.props.items.length.toString()} items total</small>
                </div>
                <div className="list-group">
                    {itemElements}
                </div>
                <div className="pagination-wrapper">
                    <ul className="pagination">
                        {pages}
                    </ul>
                </div>
            </div>
        );
    }
}

ListRenderer.propTypes = {
    items: PropTypes.arrayOf(PropTypes.element).isRequired,
    pageSize: PropTypes.number.isRequired,
};

export default ListRenderer;
