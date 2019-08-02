const initialState = { row: null, column: null};

const lastClickedTileReducer = (state=initialState, action) => {
    if(action.type === 'DISPLAY_TILE') {
        return {
            ...state,
            row: action.payload.row,
            column: action.payload.column
        }
    }
    return state;
}

export default lastClickedTileReducer;
