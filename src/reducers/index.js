import { combineReducers } from 'redux';
import board from './boardReducer';
import status from './statusReducer';
import tiles from './tileReducer';
import lastClickedTile from './lastClickedTileReducer';
import isTilePressed from './tilePressedReducer';

const rootReducer = combineReducers({
    board,
    status,
    tiles,
    lastClickedTile,
    isTilePressed
});

export default rootReducer;
