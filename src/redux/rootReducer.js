import { TABLE_RESIZE } from './types';

export const rootReducer = (state = {}, action) => {
    const {type, data} = action;

    switch (type) {
        case TABLE_RESIZE:
            const prevState = { ...state.colState } || {};
            prevState[data.id] = data.value;
            return {
                ...state, 
                colState: prevState // id: value
        }
        default: state
    }

    return state
}