import { combineReducers } from 'redux';
import exampleReducer from './example';

export default combineReducers(
    Object.assign({}, {
        example: exampleReducer,
    }),
);
