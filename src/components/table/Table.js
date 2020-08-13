import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

import { onMouseDown } from './utils';
import { TableSelection } from "./TableSelection";
import { shouldSelect, shouldResize, getMultiSelect } from "./table.functions";
import { $ } from "../../core/dom";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown', 'click']
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
        if (shouldResize(event)) {
            onMouseDown(this, event);
        } else if (shouldSelect(event)) {
            const $targetCell = $(event.target); // its faster

            if (event.shiftKey) {
                const pivotItem = this.selection.pivotItem.$el.dataset.id;
                const $multiSelectedItems = getMultiSelect(pivotItem, $targetCell.data.id, this.$root);
                
                this.selection.selectGroup($multiSelectedItems);
            } else {
                // const id = event.target.getAttribute('data-id');
                // const $targetCell = this.$root.find(`[data-id="${id}"]`); hmmm :)
    
                this.selection.select($targetCell)
            }
        }
    }

    onClick(event) {
    }
}