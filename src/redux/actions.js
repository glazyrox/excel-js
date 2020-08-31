import { CELLS_VALUES, TABLE_ROW_RESIZE, TABLE_CELL_RESIZE } from './types';

// Action Creator
export const tableResize = (data) => {
    console.log(data.type)
    return {
        type: data.type ? TABLE_CELL_RESIZE : TABLE_ROW_RESIZE,
        data
    }
}

export const saveCellTextToStore = (data) => {
    console.log(data);

    return {
        type: CELLS_VALUES,
        data
    }
}