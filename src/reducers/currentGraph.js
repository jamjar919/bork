import { UPDATE_CURRENT_GRAPH } from '../actions';

const DEFAULT = {
    data: [],
};

const reducer = (state = DEFAULT, action) => {
    switch (action.type) {
    case UPDATE_CURRENT_GRAPH:
        return action.payload.graph;
    default:
        return state;
    }
};

export default reducer;
