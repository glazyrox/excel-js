import { CELLS_VALUES, TABLE_ROW_RESIZE, TABLE_CELL_RESIZE, CHANGE_CELL_STYLES, APPLY_STYLE, CHANGE_TITLE, CURRENT_TEXT } from './types';

// Action Creator
export const tableResize = (data) => {

    return {
        type: data.type ? TABLE_CELL_RESIZE : TABLE_ROW_RESIZE,
        data
    }
}

export const saveCellTextToStore = (data) => {

    return {
        type: CELLS_VALUES,
        data
    }
}

export const changeStyles = (data) => {
    return {
        type: CHANGE_CELL_STYLES,
        data
    }
}

export const applyStyles = (data) => {
    return {
        type: APPLY_STYLE,
        data
    }
}

export const changeTitle = (data) => {
    return {
        type: CHANGE_TITLE,
        data
    }
}

export const changeCurrentText = (data) => {
    return {
        type: CURRENT_TEXT,
        data
    }
}