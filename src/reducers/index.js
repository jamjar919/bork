import { combineReducers } from 'redux';
import exampleReducer from './example';
import graphReducer from './currentGraph';
import graphIdReducer from './currentGraphId';
import solutionReducer from './solution';
import menuMinimisedReducer from './menuMinimised';
import peoplePanelCollapsedReducer from './peoplePanelCollapsed';
import solutionPanelCollapsedReducer from './solutionPanelCollapsed';
import graphColorsReducer from './graphColors';

export default combineReducers(
    Object.assign({}, {
        example: exampleReducer,
        graph: graphReducer,
        graphId: graphIdReducer,
        solution: solutionReducer,
        menuMinimised: menuMinimisedReducer,
        peoplePanelCollapsed: peoplePanelCollapsedReducer,
        solutionPanelCollapsed: solutionPanelCollapsedReducer,
        graphColors: graphColorsReducer,
    }),
);
