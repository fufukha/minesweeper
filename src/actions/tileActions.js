export const toggleFlag = (i, j) => {
    return {
        type: 'TOGGLE_FLAG',
        payload: {
            row: i,
            column: j
        }
    }
}

export const displayTile = (i, j) => {
    return {
        type: 'DISPLAY_TILE',
        payload: {
            row: i,
            column: j
        }
    }
}
