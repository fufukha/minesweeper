const initialState = {
        rows: null,
        columns: null,
        mines: null
}

const boardReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'CONFIGURE_BOARD':
            return {
                ...state.board,
                rows: action.payload.rows,
                columns: action.payload.columns,
                mines: action.payload.mines
            }
    }
    return state;
}

export default boardReducer;
