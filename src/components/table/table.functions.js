import { splitString, getRange } from '../../core/utils';

export const shouldResize = event => {
    return event.target.dataset.resize;
}

export const shouldSelect = event => {
    return event.target.dataset.type === 'cell';
}

export const getMultiSelect = (pivotItem, targetItem, root) => {
    const start = splitString(pivotItem);
    const end = splitString(targetItem);

    const rowRange = getRange(start.row, end.row);
    const cellRange = getRange(start.cell, end.cell);
    
    const multiSelectedItems = [];

    rowRange.forEach(row => {
        cellRange.forEach(cell => {
            multiSelectedItems.push(root.find(`[data-id="${row}:${cell}"]`));
        })
    })

    return multiSelectedItems;
}

export const checkKeyPress = key => {
    const navigationKeys = ['Enter', 'Tab', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

    return navigationKeys.includes(key);
}

export const getNextCellCoords = (key, coords) => { // (0 - row, 0 - cell)
    let [row, cell] = [...coords];
    const MIN_VALUE = 0;

    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++;
            break
        case 'Tab':
        case 'ArrowRight':
            cell++
            break
        case 'ArrowLeft':
            cell = cell - 1 <= MIN_VALUE ? MIN_VALUE : cell -1
            break
        case 'ArrowUp':
            row = row - 1 <= MIN_VALUE ? MIN_VALUE : row - 1
            break
        default:
            break
    }

    return `[data-id='${row}:${cell}']`
}


export const getTextTyFormula = (text, _this) => {
    // const { textContent } = event.target;

    _this.$emit('table:getTextToFormulaInput', text);
}