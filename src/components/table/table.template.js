const ASCI_CODES = {
    A: 65,
    Z: 90
};

// function toCell(_, index) {
    // return `
    //     <div class="cell" contenteditable="" data-col="${index + 1}">
    //     </div>
    // `
// }

function toCell(row) {
    return function(_, col) {

        return `
        <div class="cell" contenteditable="" 
            data-col="${col + 1}" 
            data-row="${row + 1}"
            data-id="${col}:${row}"
        >
        
        </div>`
    }
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
        <div class="row" data-type="resizable" data-col="${number}">
            <div class="row__info">
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

    rows.push(createRow(cols));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(rowsCount)
        .fill('')
        .map(toNumber)
        .map(toCell(row)) // замыкание сначала принимает row, а потом return f() и принимает (_, index) из map
        .join('')

        rows.push(createRow(cells, row + 1));
    }
    
    return rows.join('');
}