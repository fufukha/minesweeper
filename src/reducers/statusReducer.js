const initialState = {
    startTime: null,
    isRunning: false
}

const statusReducer = (state=initialState, action) => {
    if(['TOGGLE_FLAG', 'DISPLAY_TILE'].includes(action.type)) {
        if(state.startTime) {
            return state;
        } else {
            return {
                ...state,
                startTime: new Date().getTime(),
                isRunning: true,
            }
        }
    } else {
        return state;
    }
}

export default statusReducer;
