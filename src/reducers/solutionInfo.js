import { UPDATE_CURRENT_SOLUTION, UPDATE_CURRENT_GRAPH } from '../actions';

const DEFAULT = {};

const reducer = (state = DEFAULT, action) => {
    switch (action.type) {
    case UPDATE_CURRENT_GRAPH:
        return DEFAULT;
    case UPDATE_CURRENT_SOLUTION:
        return action.payload.solutionInfo;
    default:
        return state;
    }
};

export default reducer;
