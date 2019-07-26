const initialState = {
    rows: 4,
    columns: 4,
    mines: 4
}


const boardReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE_BOARD':
            return {
                ...state,
                rows: state.rows,
                columns: state.columns,
                mines: state.mines
            }
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
