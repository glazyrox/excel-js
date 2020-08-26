import { TABLE_RESIZE } from './types';

// Action Creator
export const tableResize = (data) => {
    console.log(data);
    return {
        type: TABLE_RESIZE,
        data
    }
}