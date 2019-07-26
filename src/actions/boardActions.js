export const configureBoard = (config) => {
    return {
        type: 'CONFIGURE_BOARD',
        payload: {
            rows: config.rows,
            columns: config.columns,
            mines: randomIndices(config.rows, config.columns, config.numOfMines)
        }
    }
}

export const initializeBoard = () => {
    return {
        type: 'INITIALIZE_BOARD'
    }
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
