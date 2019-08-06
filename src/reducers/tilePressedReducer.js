const initialState = false;

const tilePressedReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'PRESS_TILE':
    return true;
  case 'RELEASE_TILE':
    return false;
  case 'INITIALIZE_GAME':
    return initialState;
  }
  return state;
}

export default tilePressedReducer;
