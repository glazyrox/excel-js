const INIT = "INIT";

export const createStore = (rootReducer, initialState = {}) => {
    let state = rootReducer({...initialState}, { type: INIT });
    
    let listeners = [];
    return {
        subscribe(fn) {
            listeners.push(fn);

            return {
                unsubscribe() {
                    listeners = listeners.filter(l => l !== fn);
                }
            }
        },

        dispatch(action) {
            state = rootReducer(state, action);
            listeners.forEach(listener => listener(state));
        },

        getState() {
            return JSON.parse(JSON.stringify(state));
        }
    }
}