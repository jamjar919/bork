import { UPDATE_GRAPH_ID, UPDATE_CURRENT_GRAPH } from '../actions';

const DEFAULT = '';


const reducer = (state = DEFAULT, action) => {
    switch (action.type) {
    case UPDATE_GRAPH_ID:
        return action.payload.id;
    case UPDATE_CURRENT_GRAPH:
        // eslint-disable-next-line no-underscore-dangle
        return action.payload.graph._id;
    default:
        return state;
    }
};

export default reducer;
