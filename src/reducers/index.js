import { combineReducers } from 'redux';
import board from './boardReducer';
import status from './statusReducer';
import tiles from './tileReducer';
import lastClickedTile from './lastClickedTileReducer';

const rootReducer = combineReducers({
    board,
    status,
    tiles,
    lastClickedTile
});

export default rootReducer;
