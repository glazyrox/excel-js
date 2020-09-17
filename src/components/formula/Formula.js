import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/dom";

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options,
        });
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false" data-input="input"></div>
        `
    }

    init() {
        super.init();

        this.$formula = this.$root.find('#formula')

        this.$on('table:getTextToFormulaInput', text => {
            this.$formula.text(text);
        });
        this.$formula.text(this.store.getState().currentText);
    }

    storeChanged(changes) {
        const { currentText } = changes;
        currentText ? this.$formula.text(currentText) : this.$formula.text(' ');
    }

    onInput(event) {
        const text = $(event.target).text();
        this.$emit('formula:input', text);
    }
    
    onKeydown(event) {
        const keys = ['Enter', 'Tab'];
        if (keys.includes(event.key)) {
            event.preventDefault();
            this.$emit('formula:done');
        }
    }
}