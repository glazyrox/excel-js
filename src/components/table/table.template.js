const ASCI_CODES = {
    A: 65,
    Z: 90
};

function toCell(_, index) {
    return `
        <div class="cell" contenteditable="" data-col="${index + 1}" data-row="${index + 1}">
        </div>
    `
}

function toColumn(content, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index + 1}">
            ${content}
            <div class="col-resize" data-resize="col" ></div>
        </div>
    `
}

function createRow(content, number = '') {
    const resizer = number ? '<div class="row-resize" data-resize="row" ></div>' : '';
    
    return `
        <div class="row">
            <div class="row__info" data-type="resizable" data-elem="row" data-row="${number}">
                ${number}
                ${resizer}
            </div>
            <div class="row__data" data-type="row">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(ASCI_CODES.A + index);
}

function toNumber(_, index) {
    return index + 1;
}

export function createTable(rowsCount = 14) {
    const colsCount = ASCI_CODES.Z - ASCI_CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount) // column
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');
    
    const rowData = new Array(rowsCount)
        .fill('')
        .map(toNumber)
        .map(toCell)
        .join('')
        
    rows.push(createRow(cols));

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(rowData, i + 1));
    }
    
    return rows.join('');
}