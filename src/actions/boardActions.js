const defaultConfig = {
    rows: 4,
    columns: 4,
    numOfMines: 4
}

export const configureBoard = (config=defaultConfig) => {
    return {
        type: 'CONFIGURE_BOARD',
        payload: config
    }
}
