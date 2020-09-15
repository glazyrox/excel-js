import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/dom";
import { changeTitle } from '../../redux/actions';
import { debounce } from "../../core/utils";

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options,
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput.bind(this), 300);
    }

    toHTML() {
        const { title } = this.store.getState();
        
        return `
        <input id="header" type="text" class="input" value="${title}" />

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

    onInput(event) {
        console.log('hi');
        this.$dispatch(changeTitle($(event.target).text()));
    }
}