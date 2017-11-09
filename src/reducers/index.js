import { combineReducers } from 'redux';
import exampleReducer from './example';
import graphReducer from './currentGraph';
import graphIdReducer from './currentGraphId';
import solutionReducer from './solution';

export default combineReducers(
    Object.assign({}, {
        example: exampleReducer,
        graph: graphReducer,
        graphId: graphIdReducer,
        solution: solutionReducer,
    }),
);
