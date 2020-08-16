import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

import { onMouseDown } from './utils';
import { TableSelection } from "./TableSelection";
import { shouldSelect, shouldResize, getMultiSelect, checkKeyPress, getNextCellCoords, getTextTyFormula } from "./table.functions";
import { $ } from "../../core/dom";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options = {}) {
        super($root, {
            name: 'table',
            listeners: ['mousedown', 'keydown'],
            ...options
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
        this.selection.select($cell);

        this.$on('formula:input', text => {
            this.selection.pivotItem.text(text);
        });

        this.$on('formula:done', () => {
            this.selection.pivotItem.focus();
        })
        
        this.$emit('table:getTextToFormulaInput', $cell.text());
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

            getTextTyFormula($(event.target).text(), this);
        }
    }

    onKeydown(event) {
        const { key } = event;

        if (checkKeyPress(key) && !event.shiftKey) {
            event.preventDefault();
            const coords = this.selection.pivotItem.$el.dataset.id.split(':');

            const $cell = this.$root.find(getNextCellCoords(key, coords));
            this.selection.select($cell)
        }

        setTimeout(() => getTextTyFormula($(event.target).text(), this), 0);
    }
}