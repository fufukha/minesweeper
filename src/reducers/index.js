import { combineReducers } from 'redux';
import board from './boardReducer';
import status from './statusReducer';

const rootReducer = combineReducers({
    board,
    status,
});

export default rootReducer;
