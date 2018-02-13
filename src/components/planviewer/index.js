import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GraphProvider from '../../containers/graphprovider';
import Graph from '../../components/graph';
import NameList from '../../components/namelist';
import SolutionList from '../../components/solutionlist';
import Card from '../../containers/card';
import CollapsableColumn from '../../containers/collapsablecolumn';
import CollapsableCard from '../../containers/collapsablecard';
import CurrentGraphControls from '../../components/currentgraphcontrols';

import { togglePeoplePanelAction, toggleSolutionPanelAction, updateColorsAction } from '../../actions';

// eslint-disable-next-line react/prefer-stateless-function
class PlanViewer extends React.Component {
    constructor() {
        super();
        this.state = {
            rightColCollapse: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        // If not collapsed, and all components inside are, collapse right col
        if (
            !this.state.rightColCollapse &&
            nextProps.solutionPanelCollapsed &&
            nextProps.peoplePanelCollapsed
        ) {
            this.setState({ rightColCollapse: true });
        }

        // If collapsed and one component is not collapsed, expand right col
        if (
            this.state.rightColCollapse &&
            (!nextProps.solutionPanelCollapsed || !nextProps.peoplePanelCollapsed)
        ) {
            this.setState({ rightColCollapse: false });
        }
    }

    render() {
        const id = this.props.match.params.id;
        return (
            <GraphProvider id={id}>
                <div className="plan content">
                    <h3>
                        {this.props.graph.name}
                        <small className="text-muted"> Viewing</small>
                    </h3>
                    <div className="two-cols">
                        <div className="cardContainer">
                            <Card
                                title="Layout"
                            >
                                <div className="graphContainer">
                                    <Graph
                                        networkID={id}
                                        matrix={this.props.graph.data}
                                        partition={this.props.solution}
                                        names={this.props.graph.names}
                                        colorCallback={this.props.updateColors}
                                    />
                                </div>
                            </Card>
                        </div>
                        <CollapsableColumn
                            collapse={this.state.rightColCollapse}
                        >
                            <CollapsableCard
                                title="Solve"
                                collapse={this.props.solutionPanelCollapsed}
                                onMinimise={this.props.toggleSolutionPanel}
                                parentCollapsed={this.state.rightColCollapse}
                                icon="line-chart"
                            >
                                <div className="solution">
                                    <div className="card-body">
                                        <CurrentGraphControls
                                            id={id}
                                        />
                                    </div>
                                </div>
                            </CollapsableCard>
                            <CollapsableCard
                                title="Solution"
                                collapse={this.props.solutionPanelCollapsed}
                                onMinimise={this.props.toggleSolutionPanel}
                                parentCollapsed={this.state.rightColCollapse}
                                icon="line-chart"
                            >
                                <SolutionList
                                    names={this.props.graph.names}
                                    partition={this.props.solution}
                                />
                            </CollapsableCard>
                            <CollapsableCard
                                title="Participants"
                                collapse={this.props.peoplePanelCollapsed}
                                onMinimise={this.props.togglePeoplePanel}
                                parentCollapsed={this.state.rightColCollapse}
                                icon="users"
                            >
                                <NameList
                                    names={this.props.graph.names}
                                    size={this.props.graph.data.length}
                                />
                            </CollapsableCard>
                        </CollapsableColumn>
                    </div>
                </div>
            </GraphProvider>
        );
    }
}

PlanViewer.propTypes = {
    match: PropTypes.shape(Object).isRequired,
    graph: PropTypes.shape(Object).isRequired,
    // graphId: PropTypes.string.isRequired,
    solution: PropTypes.arrayOf(Array),
    solutionPanelCollapsed: PropTypes.bool.isRequired,
    peoplePanelCollapsed: PropTypes.bool.isRequired,
    toggleSolutionPanel: PropTypes.func.isRequired,
    togglePeoplePanel: PropTypes.func.isRequired,
    updateColors: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        graph: state.graph,
        graphId: state.graphId,
        solution: state.solution,
        solutionPanelCollapsed: state.solutionPanelCollapsed,
        peoplePanelCollapsed: state.peoplePanelCollapsed,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleSolutionPanel: toggleSolutionPanelAction(dispatch),
        togglePeoplePanel: togglePeoplePanelAction(dispatch),
        updateColors: updateColorsAction(dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanViewer);
