import { UPDATE_COLORS } from '../actions';

const DEFAULT = [];

const reducer = (state = DEFAULT, action) => {
    switch (action.type) {
    case UPDATE_COLORS:
        return Object.assign([], action.payload);
    default:
        return state;
    }
};

export default reducer;
