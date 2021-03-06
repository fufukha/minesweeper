export const toggleFlag = (i, j) => {
  return {
    type: 'TOGGLE_FLAG',
    payload: {
      row: i,
      column: j,
      clickTime: new Date().getTime()
    }
  }
}

export const displayTile = (i, j) => {
  return {
    type: 'DISPLAY_TILE',
    payload: {
      row: i,
      column: j,
      clickTime: new Date().getTime()
    }
  }
}

export const pressTile = () => {
  return {
    type: 'PRESS_TILE'
  }
}

export const releaseTile = () => {
  return {
    type: 'RELEASE_TILE'
  }
}
