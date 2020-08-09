import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

// import { $ } from '../../core/dom';
import { onMouseDown } from './utils';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(26);
    }

    onMousedown(event) {
        onMouseDown(this, event);
    }
}