export function capitalize(string) {
    if (typeof(string) !== 'string') {
        return '';
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const splitString = (coords) => {
    const _array = coords.split(':');

    return {
        row: +_array[0],
        cell: +_array[1]
    }
}

export const getRange = (first, last) => {
    if (first > last) {
        [first, last] = [last, first];
    }

    return new Array(last - first + 1)
        .fill('')
        .map((_, index) => first + index);
}

export const storage = (key, data = null) => {

    if (!data && localStorage[key]) {
        const store = JSON.parse(localStorage[key]);
        if (store) {
            store.currentText = '';
            store.currentStyles = {};
        }
        return store;
    }
    
    localStorage.setItem(key, JSON.stringify(data));
}

export const isEqual = (a, b) => {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
}

export const camelCaseToDash = (myStr) => {
    return myStr.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export const stylesToInline = (styles = {}) => {
    if (!Object.keys(styles).length) {
        return;
    }
    return Object.keys(styles)
    .map(key => `${camelCaseToDash(key)}:${styles[key]}`)
    .join(';')
}

export const debounce = (fn, wait) => {
    let timeout;
    return (...args) => {

        const later = () => {
            clearTimeout(timeout);
            // eslint-disable-next-line
            fn.apply(this, args);
        }

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }
}