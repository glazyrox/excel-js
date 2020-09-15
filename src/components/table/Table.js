import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

import { onMouseDown } from './utils';
import { TableSelection } from "./TableSelection";
import { shouldSelect, shouldResize, getMultiSelect, checkKeyPress, getNextCellCoords, getTextTyFormula } from "./table.functions";
import { $ } from "../../core/dom";

import * as actions from './../../redux/actions'
import { DEFAULT_TOOLBAR_BUTTONS } from "../../constants";
import { parse } from "../../core/parse";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options = {}) {
        super($root, {
            name: 'table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML() {
        const tableSizes = this.store.getState();
        return createTable(26, tableSizes);
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        
        const $cell = this.$root.find('[data-id="0:0"]');
        this.selection.select($cell);
        this.$dispatch(actions.changeCurrentText(this.selection.pivotItem.text()));
        
        this.$on('formula:input', text => {
            this.selection.pivotItem
                .attr('data-value', text)
                .text(parse(text));
            this.saveTextToStore(text);
        });

        this.$on('formula:done', () => {
            this.selection.pivotItem.focus();
        })

        this.$on('toolbar:appStyle', value => {
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyles({
                value,
                ids: this.selection.selectedIds
            }))
        }) 
    }


    async resizeTable() {
        try {
            const data = await onMouseDown(this, event);
            this.$dispatch(actions.tableResize(data));
        } catch (e) {
            console.warn('Error: ', e.message);
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(this, event);
        } else if (shouldSelect(event)) {
            const $targetCell = $(event.target); // its faster

            if (event.shiftKey) {
                const pivotItem = this.selection.pivotItem.$el.dataset.id;
                const $multiSelectedItems = getMultiSelect(pivotItem, $targetCell.data.id, this.$root);
                
                this.selection.selectGroup($multiSelectedItems);
            } else {
                // const id = event.target.getAttribute('data-id');
                // const $targetCell = this.$root.find(`[data-id="${id}"]`); hmmm :)
     
                this.selection.select($targetCell);
                const keys = Object.keys(DEFAULT_TOOLBAR_BUTTONS);
                const cellStyles = $targetCell.getStyles(keys);
                this.$dispatch(actions.changeStyles(cellStyles));
                this.saveTextToStore($(event.target).text());
            }

            getTextTyFormula($(event.target).text(), this); // emitter
        }
    }

    saveTextToStore(value) {
        const { id } = this.selection.pivotItem.$el.dataset;
        const data = {
            value,
            id
        }

        this.$dispatch(actions.saveCellTextToStore(data));
    }

    onKeydown(event) {
        const { key } = event;
        const coords = this.selection.pivotItem.$el.dataset.id.split(':');
        const $cell = this.$root.find(getNextCellCoords(key, coords));
        if (checkKeyPress(key) && !event.shiftKey) {
            event.preventDefault();
            this.selection.select($cell);
        }
    }

    onInput(event) {
        this.saveTextToStore($(event.target).text());
    }
}