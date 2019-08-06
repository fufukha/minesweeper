const initialState = {
  row: null,
  column: null,
  lastClickTime: null
};

const lastClickedTileReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'DISPLAY_TILE':
    return {
      ...state,
      row: action.payload.row,
      column: action.payload.column,
      lastClickTime: action.payload.clickTime
    }
  case 'TOGGLE_FLAG':
    return {
      ...state,
      lastClickTime: action.payload.clickTime
    }
  case 'INITIALIZE_GAME':
    return initialState;
  }
  return state;
}

export default lastClickedTileReducer;
