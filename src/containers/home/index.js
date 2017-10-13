import React from 'react';

import Content from 'Components/Content';

// eslint-disable-next-line react/prefer-stateless-function
class Home extends React.Component {

    render() {
        return (
            <div className="col-md-9">
                <Content text="home page content" />
            </div>
        );
    }
}

export default Home;
