import { ExcelComponent } from "../../core/ExcelComponent";

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'header',
            ...options,
        })
    }

    init() {
        // this.header = this.$root.find("#header");
        
        // console.log(header)
    }

    toHTML() {
        return `
        <input id="header" type="text" class="input" value="Новая таблица" />

            <div>
                <div class="button">
                    <span class="material-icons">
                        delete
                    </span>
                </div>
    
                <div class="button">
                    <span class="material-icons">
                        exit_to_app
                    </span>
                </div>
            </div>
        `
    }
}