export const startGame = () => {
    return {
        type: 'START_GAME',
        payload: new Date().getTime()
    }
}

export const endGame = () => {
    return {
        type: 'END_GAME', 
    }
}
