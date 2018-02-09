import { connect } from 'react-redux';
import React from 'react';
// import Graph from '../../components/graph';
import GraphList from '../../components/graphlist';
import NewGraphForm from '../../components/newgraph';

// eslint-disable-next-line react/prefer-stateless-function
class Home extends React.Component {

    render() {
        return (
            <div className="content home">
                <div className="jumbotron">
                    <h1 className="display-3">Welcome to Parter!</h1>
                    <p className="lead">Parter is a tool that helps you divide your friendship group into subgroubs using
                    the magic of computer science. Use it to set tables, decide housing groups,
                    and much more.</p>
                </div>
                <h2>List Graphs</h2>
                <GraphList />
                <h2>New Graph</h2>
                <NewGraphForm />
            </div>
        );
    }
}

function mapStateToProps(state) {
    // gets the state from redux
    return {
        example: state.example,
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
