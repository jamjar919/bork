import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class Content extends React.Component {

    render() {
        return (
            <div className="content">
                {this.props.text}
            </div>
        );
    }
}

Content.propTypes = {
    text: PropTypes.string,
};

export default Content;
