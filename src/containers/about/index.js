import React from 'react';
import Content from '../../components/content';

// eslint-disable-next-line react/prefer-stateless-function
class About extends React.Component {

    render() {
        return (
            <div className="col-md-9">
                <Content text="about page content" />
            </div>
        );
    }
}

export default About;
