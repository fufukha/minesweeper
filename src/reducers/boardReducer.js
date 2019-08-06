const initialState = {
  rows: null,
  columns: null,
  mines: {}
}


const boardReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'INITIALIZE_GAME':
    return {
      ...state.board,
      rows: action.payload.rows,
      columns: action.payload.columns,
      mines: action.payload.mines
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
