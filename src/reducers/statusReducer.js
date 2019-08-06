const initialState = {
  startTime: null,
  hasStarted: false
}

const statusReducer = (state=initialState, action) => {
  if (['TOGGLE_FLAG', 'DISPLAY_TILE'].includes(action.type)) {
    if (state.startTime) {
      return state;
    } else {
      return {
        ...state,
        startTime: new Date().getTime(),
        hasStarted: true,
      }
    }
  } else if (action.type === 'INITIALIZE_GAME') {
    return initialState;
  } else {
    return state;
  }
}

export default statusReducer;
