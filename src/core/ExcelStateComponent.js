import { ExcelComponent } from "./ExcelComponent";

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args);
    }

    initState(state = {}) {
        this.state = {...state}
    }

    get template() {
        return JSON.stringify(this.state, null, 2);
    }

    setState(newState) {
        this.state = {...this.state, ...newState}
        this.$root.html(this.template)
    }
}