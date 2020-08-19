import { TABLE_RESIZE } from './types';

export const tableResize = (data) => {
    console.log(data);
    return {
        type: TABLE_RESIZE,
        data
    }
}