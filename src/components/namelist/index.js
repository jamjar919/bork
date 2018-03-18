import React from 'react';
import PropTypes from 'prop-types';

import Name from './name';

// eslint-disable-next-line react/prefer-stateless-function
class NameList extends React.Component {

    render() {
        const rows = [];
        const names = this.props.names;
        for (let i = 0; i < this.props.size; i += 1) {
            rows.push(<Name key={i} id={i} name={names[i]} />);
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
