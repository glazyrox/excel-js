import { TABLE_CELL_RESIZE, CELLS_VALUES, TABLE_ROW_RESIZE, CHANGE_CELL_STYLES } from './types';

export const rootReducer = (state = {}, action) => {
    const { type, data } = action;
    let field;

    switch (type) {
        case TABLE_CELL_RESIZE:
            field = 'colState';
            // prevState = { ...state.colState } || {};
            // prevState[data.id] = data.value;
            return {
                ...state, 
                colState: value(state, field, action) // id: value
            }
        case TABLE_ROW_RESIZE:
            field = 'rowState';
            return {
                ...state,
                rowState: value(state, field, action)
            }
        case CELLS_VALUES:
            field = 'cellState';
            return {
                ...state,
                cellsState: value(state, field, action),
                currentText: data.value
            }
        case CHANGE_CELL_STYLES:
            return {
                ...state,
                currentStyles: data
            }
        default: state
    }

    return state
}

const value = (state, field, action) => {
    const val = state[field] || {};
    val[action.data.id] = action.data.value;
    return val;
}