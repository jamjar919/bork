import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class NameList extends React.Component {

    render() {
        const rows = [];
        const names = this.props.names;
        for (let i = 0; i < this.props.size; i += 1) {
            if (names[i]) {
                rows.push(<li key={i} className="list-group-item d-flex justify-content-between align-items-center">{names[i]}<span className="badge badge-primary badge-pill">{i}</span></li>);
            } else {
                rows.push(<li key={i} className="list-group-item d-flex justify-content-between align-items-center">Unnamed<span className="badge badge-primary badge-pill">{i}</span></li>);
            }
        }
        if (rows.length < 1) {
            rows.push(<li key="-1" className="list-group-item">Nothing to display</li>);
        }
        return (
            <ul className="list-group list-group-flush">
                {rows}
            </ul>
        );
    }
}

NameList.propTypes = {
    names: PropTypes.arrayOf(PropTypes.string),
    size: PropTypes.number,
};

NameList.defaultProps = {
    names: [],
    size: 0,
};

export default NameList;
