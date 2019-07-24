const initialState = {
    board: {
        rows: null,
        columns: null,
        mines: null
    }
}

const boardReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'CONFIGURE_BOARD':
            return {
                ...state,
                board: {
                    ...state.board,
                    rows: action.payload.rows,
                    columns: action.payload.columns,
                    mines: randomIndices(action.payload.rows, action.payload.columns, action.payload.numOfMines)
                }
            }
    }
    return state;
}

function randomIndices(rows, columns, numberOfIndices) {
    let count = numberOfIndices + 1;
    const randomIndices = {};

    while(--count) {
        const i = randomInteger(rows);
        const j = randomInteger(columns);

        if(randomIndices[i] && randomIndices[i][j]) {
			count++;
		} else {
			if(randomIndices[i] === undefined) randomIndices[i] = {};
			randomIndices[i][j] = true;
		}
    }
    return randomIndices;
}

function randomInteger(max) {
    return Math.floor(Math.random() * max);
}

export default boardReducer;
