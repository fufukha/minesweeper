import { combineReducers } from 'redux';
import board from './boardReducer';

const rootReducer = combineReducers({
    board,
});

export default rootReducer;
