const ASCI_CODES = {
    A: 65,
    Z: 90
};

const DEFAULT_WIDTH = 120;

function toCell(row, state) {

    return function(_, index) {
        const width = getWidth(index, state)
        return `
        <div class="cell" contenteditable="" 
            data-col="${index + 1}" 
            data-row="${row + 1}"
            data-type="cell"
            data-id="${row}:${index}"
            style="width: ${width}"
        >
        
        </div>`
    }
}

function toColumn({content, index, width}) {
    return `
        <div class="column" data-type="resizable" data-col="${index + 1}" style="width: ${width}">
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

const getWidth = (index, state) => {
    return (state[index + 1]|| DEFAULT_WIDTH) + 'px';
}

const withWidthFrom = (state) => { // nice
    return (content, index) => {
        return {
            content, index, width: getWidth(index, state.colState)
        }
    }
}

export function createTable(rowsCount = 14, state) {
    const colsCount = ASCI_CODES.Z - ASCI_CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount) // column
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state)) 
        .map(toColumn)
        // .map((content, index) => { // замена сверху
        //     const width = getWith(index, state.colState)
        //     return toColumn(content, index, width);
        // }) 
        .join('');

    rows.push(createRow(cols));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(rowsCount)
        .fill('')
        .map(toNumber)
        .map(toCell(row, state.colState) ) // замыкание сначала принимает row, а потом return f() и принимает (_, index) из map
        .join('')

        rows.push(createRow(cells, row + 1));
    }
    
    return rows.join('');
}