import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SolutionControl from './solutioncontrol';

const CurrentGraphControls = () => (
    <div className="graphControl">
        <SolutionControl />
    </div>
);

CurrentGraphControls.propTypes = {
};

function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentGraphControls);
