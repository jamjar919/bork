import { UPDATE_CURRENT_SOLUTION } from '../actions';

const DEFAULT = [];

const reducer = (state = DEFAULT, action) => {
    switch (action.type) {
    case UPDATE_CURRENT_SOLUTION:
        return action.payload.solution;
    default:
        return DEFAULT;
    }
};

export default reducer;
