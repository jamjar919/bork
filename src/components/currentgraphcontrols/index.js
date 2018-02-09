import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SolutionControl from './solutioncontrol';


const CurrentGraphControls = props => (
    <div className="graphControl">
        <SolutionControl />
        &nbsp;-&nbsp;
        <Link to={`/${props.id}/edit`}>
            Edit
        </Link>
    </div>
);

CurrentGraphControls.propTypes = {
    id: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        id: state.graphId,
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentGraphControls);
