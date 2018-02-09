import { TOGGLE_PEOPLE_PANEL } from '../actions';

const DEFAULT = false;

const reducer = (state = DEFAULT, action) => {
    switch (action.type) {
    case TOGGLE_PEOPLE_PANEL:
        return !state;
    default:
        return state;
    }
};

export default reducer;
