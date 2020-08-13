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