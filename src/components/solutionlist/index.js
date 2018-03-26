import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../bootstrap.min';


// eslint-disable-next-line react/prefer-stateless-function
class SolutionList extends React.Component {

    render() {
        const menuItems = [];
        for (let i = 0; i < this.props.partition.length; i += 1) {
            menuItems.push(
                <li
                    key={i}
                    className="nav-item"
                >
                    <a
                        className={`nav-link partition-${i} ${i === 0 ? 'active show' : ''}`}
                        data-toggle="tab"
                        href={`#group${i}`}
                    >Group {i}</a>
                </li>,
            );
        }
        const tabs = [];
        for (let i = 0; i < this.props.partition.length; i += 1) {
            const tabContent = [];
            if (this.props.partition[i]) {
                for (let j = 0; j < this.props.partition[i].length; j += 1) {
                    tabContent.push(
                        <li key={j} className="list-group-item d-flex justify-content-between align-items-center">
                            {this.props.names[this.props.partition[i][j]] ? this.props.names[this.props.partition[i][j]] : 'Unnamed'}
                            <span
                                className="badge badge-pill"
                                style={{
                                    backgroundColor: (this.props.graphColors[i] ? this.props.graphColors[i] : '#2C3E50'),
                                    color: '#FFF',
                                }}
                            >{this.props.partition[i][j]}</span>
                        </li>,
                    );
                }
            }
            tabs.push(
                <div key={i} className={`tab-pane ${i === 0 ? 'active' : ''}`} id={`group${i}`}>
                    <ul className="list-group">
                        {tabContent}
                    </ul>
                </div>,
            );
        }
        let style = '';
        for (let i = 0; i < this.props.partition.length; i += 1) {
            style += `.nav-tabs .partition-${i}.active.nav-link  { color: #FFF; background-color: ${(this.props.graphColors[i] ? this.props.graphColors[i] : '#2C3E50')}; } `;
        }
        return (
            <div className="solutionList">
                <style>
                    {style}
                </style>
                <div className="solution-stats">
                    {JSON.stringify(this.props.solutionInfo)}
                </div>
                <ul className="nav nav-tabs" data-tabs="tabs">
                    {menuItems}
                </ul>
                <div id="solutiontabs" className="tab-content">
                    {tabs}
                </div>
            </div>
        );
    }
}

SolutionList.propTypes = {
    partition: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    names: PropTypes.arrayOf(PropTypes.string),
    graphColors: PropTypes.arrayOf(PropTypes.string).isRequired,
    solutionInfo: PropTypes.shape(Object).isRequired,
};

SolutionList.defaultProps = {
    partition: [],
    names: [],
    graphColors: [],
};

function mapStateToProps(state) {
    return {
        graphColors: state.graphColors,
        solutionInfo: state.solutionInfo,
    };
}

export default connect(mapStateToProps)(SolutionList);
