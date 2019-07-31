import { combineReducers } from 'redux';
import board from './boardReducer';
import status from './statusReducer';
import tiles from './tileReducer';
// TODO: yarn add reset-css and import it

const rootReducer = combineReducers({
    board,
    status,
    tiles
});

export default rootReducer;
