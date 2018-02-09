import { TOGGLE_MENU } from '../actions';

const DEFAULT = false;

const reducer = (state = DEFAULT, action) => {
    switch (action.type) {
    case TOGGLE_MENU:
        return !state;
    default:
        return state;
    }
};

export default reducer;
