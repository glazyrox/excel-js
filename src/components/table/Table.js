import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

import { onMouseDown } from './utils';
import { TableSelection } from "./TableSelection";

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

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        
        const $cell = this.$root.find('[data-id="0:0"]');
        this.selection.select($cell)
    }

    onMousedown(event) {
        onMouseDown(this, event);
    }

    onClick(event) {
        
    }
}