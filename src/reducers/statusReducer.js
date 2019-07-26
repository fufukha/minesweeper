const initialState = {
    startTime: null,
    isRunning: false
}

const statusReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'START_GAME': {
            return {
                ...state,
                startTime: action.payload,
                isRunning: true,
            }
        }
        case 'END_GAME': {
            return {
                ...state,
                isRunning: false
            }
        }
    }
    return state
}

export default statusReducer;
