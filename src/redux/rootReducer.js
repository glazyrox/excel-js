import { TABLE_CELL_RESIZE, CELLS_VALUES, TABLE_ROW_RESIZE, CHANGE_CELL_STYLES, APPLY_STYLE, CHANGE_TITLE, CURRENT_TEXT } from './types';

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
            console.log(data);
            return {
                ...state,
                cellsState: {...state.cellsState, ...value(state, field, action)},
                currentText: data.value
            }
        case CHANGE_CELL_STYLES:
            return {
                ...state,
                currentStyles: data
            }
        case APPLY_STYLE: 
        field = 'stylesState';
        const val = state[field] || {};
        data.ids.forEach(id => {
            val[id] = {...val[id], ...data.value}
        })
            return {
                ...state,
                [field]: val,
                currentStyles: {...state.currentStyles, ...data.value}
            }
        case CHANGE_TITLE: 
            return {
                ...state,
                title: data,
            }
        case CURRENT_TEXT: 
            return {
                ...state,
                currentText: data
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