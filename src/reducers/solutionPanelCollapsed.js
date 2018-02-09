import { TOGGLE_SOLUTION_PANEL } from '../actions';

const DEFAULT = false;

const reducer = (state = DEFAULT, action) => {
    switch (action.type) {
    case TOGGLE_SOLUTION_PANEL:
        return !state;
    default:
        return state;
    }
};

export default reducer;
