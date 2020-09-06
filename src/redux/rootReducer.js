import { TABLE_CELL_RESIZE, CELLS_VALUES, TABLE_ROW_RESIZE } from './types';

export const rootReducer = (state = {}, action) => {
    const { type, data } = action;
    let prevState;

    switch (type) {
        case TABLE_CELL_RESIZE:
            prevState = { ...state.colState } || {};
            prevState[data.id] = data.value;
            return {
                ...state, 
                colState: prevState // id: value
            }
        case TABLE_ROW_RESIZE:
            prevState = { ...state.rowState } || {};
            prevState[data.id] = data.value;
            return {
                ...state,
                rowState: prevState
            }
        case CELLS_VALUES:
            prevState = { ...state.cellsState} || {}
            prevState[data.id] = data.value;
            return {
                ...state,
                cellsState: prevState,
                currentText: data.value
            }
        default: state
    }

    return state
}