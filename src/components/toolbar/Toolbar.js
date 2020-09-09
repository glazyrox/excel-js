import { ExcelStateComponent } from "../../core/ExcelStateComponent";
import { createToolbar } from "./toolbar.template";
import { $ } from '../../core/dom';
import { DEFAULT_TOOLBAR_BUTTONS } from "../../constants";

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        })
    }

    prepare() {
        this.initState(DEFAULT_TOOLBAR_BUTTONS);
    }

    get template() {
        return createToolbar(this.state);
    }

    toHTML() {
        return this.template;
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles);
    }

    onClick(event) {
        const $target = $(event.target);

        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value);
            // const key = Object.keys(value)[0];

            this.$emit('toolbar:appStyle', value);
            // this.setState({[key]: value[key]})
        }
    }
    
}