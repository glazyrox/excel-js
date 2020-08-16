import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/dom";

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options,
        });
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false" data-input="input"></div>
        `
    }

    init() {
        super.init();

        this.$on('table:getTextToFormulaInput', text => {
            const input = this.$root.$el.querySelector('[data-input="input"]');
            input.textContent = text;
        });
    }

    onInput(event) {
        // const text = event.target.textContent;
        
        this.$emit('formula:input', $(event.target).text());
    }
    
    onKeydown(event) {
        const keys = ['Enter', 'Tab'];
        if (keys.includes(event.key)) {
            event.preventDefault();
            this.$emit('formula:done');
        }
    }
}