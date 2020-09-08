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

export const storage = (key, data) => {
    if (!data) {
        return JSON.parse(localStorage[key]);
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