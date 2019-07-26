
const initialState = {
    flagged: {},
    displayed: {}
}

const tileReducer = (state=initialState, action) => {
        if(['TOGGLE_FLAG', 'DISPLAY_TILE'].includes(action.type)) {
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
                    displayed: addNestedProp(state.displayed, row, column, true)
                }
        }
    }
    return state
}

function updateFlags(state, i, j) {
    if(state[i] && state[i][j]) {
        return deleteNestedProp(state, i, j)
    } else {
        return addNestedProp(state, i, j, true)
    }
}

function addNestedProp(object, parentKey, childKey, value) {
    if(object[parentKey] === undefined) {
        return {...object, [parentKey]: {[childKey]: value}}
    } else {
        const withChildKey = {...object[parentKey], [childKey]: value}
        return {...object, [parentKey]: withChildKey}
    }
}

function deleteNestedProp(object, parentKey, childKey) {
    const withoutChildKey = {...object[parentKey]}
    delete withoutChildKey[childKey]
		if(Object.entries(withoutChildKey).length === 0){
				const withoutParentKey = {...object}
				delete withoutParentKey[parentKey]
				return withoutParentKey
		} else {
				return {...object, [parentKey]:withoutChildKey}
		}
}

export default tileReducer;
