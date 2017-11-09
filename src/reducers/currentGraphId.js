import { UPDATE_GRAPH_ID } from '../actions';

const DEFAULT = '';

const reducer = (state = DEFAULT, action) => {
    switch (action.type) {
    case UPDATE_GRAPH_ID:
        return action.payload.id;
    default:
        return DEFAULT;
    }
};

export default reducer;
