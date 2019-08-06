import newDisplayed from './newDisplayed';

const initialState = {
  flagged: {},
  displayed: {}
}

const tileReducer = (state=initialState, action, { mines, rows, columns }) => {
  if (['TOGGLE_FLAG', 'DISPLAY_TILE'].includes(action.type)) {
    const { row, column } = action.payload;

    switch (action.type) {
    case 'TOGGLE_FLAG':

      return {
        ...state,
        flagged: updateFlags(state.flagged, row, column)
      }
    case 'DISPLAY_TILE':
      return {
        ...state,
        displayed: newDisplayed(state.displayed, mines, rows,
          columns, [row, column], state.flagged)
      }
    }
  } else if (action.type === 'INITIALIZE_GAME') {
    return initialState;
  }
  return state
}

function updateFlags(state, row, column) {
  if (state[row] && state[row][column]) {
    return deleteNestedProp(state, row, column)
  } else {
    return addNestedProp(state, row, column, true)
  }
}

function addNestedProp(object, parentKey, childKey, value) {
  if (object[parentKey] === undefined) {
    return { ...object, [parentKey]: { [childKey]: value }}
  } else {
    const withChildKey = { ...object[parentKey], [childKey]: value }
    return { ...object, [parentKey]: withChildKey }
  }
}

function deleteNestedProp(object, parentKey, childKey) {
  const withoutChildKey = { ...object[parentKey] }
  delete withoutChildKey[childKey]
  if (Object.entries(withoutChildKey).length === 0){
    const withoutParentKey = { ...object }
    delete withoutParentKey[parentKey]
    return withoutParentKey
  } else {
    return { ...object, [parentKey]:withoutChildKey }
  }
}

export default tileReducer;
