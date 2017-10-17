import { EXAMPLE } from '../actions';

const DEFAULT = 'b';

const example = (state = DEFAULT, action) => {
    switch (action.type) {
    case EXAMPLE:
        return 'b';
    default:
        return DEFAULT;
    }
};

export default example;
