import board from './boardReducer';
import status from './statusReducer';
import tiles from './tileReducer/';
import lastClickedTile from './lastClickedTileReducer';
import isTilePressed from './tilePressedReducer';

const rootReducer = (state={}, action) => {
  return {
    board: board(state.board, action),
    status: status(state.status, action),
    tiles: tiles(state.tiles, action, state.board || {}),
    lastClickedTile: lastClickedTile(state.lastClickedTile, action),
    isTilePressed: isTilePressed(state.isTilePressed, action)
  }
}

export default rootReducer;
