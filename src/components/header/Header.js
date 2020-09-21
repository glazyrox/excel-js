import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/dom";
import { changeTitle } from '../../redux/actions';
import { debounce } from "../../core/utils";
import { ActiveRoute } from "../../core/routes/ActiveRoute";

const excel = 'excel/';
const dashboard = '#dashboard';

const meta = `data-type="button"`;
const dataType = `data-value=`;

const EXIT_BUTTON = 'EXIT_BUTTON';
const DELETE_BUTTON = 'DELETE_BUTTON';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
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
                <div ${meta} ${dataType + DELETE_BUTTON} class="button">
                    <span ${meta} ${dataType + DELETE_BUTTON} class="material-icons">
                        delete
                    </span>
                </div>
    
                <div ${meta} ${dataType + EXIT_BUTTON} class="button">
                    <span ${meta} ${dataType + EXIT_BUTTON} class="material-icons">
                        exit_to_app
                    </span>
                </div>
            </div>
        `
    }

    onInput(event) {
        this.$dispatch(changeTitle($(event.target).text()));
    }

    onClick(event) {
        const $target = $(event.target);

        if ($target.data.type === 'button') {
            const { value } = $target.data;

            if (value === EXIT_BUTTON) {
                ActiveRoute.navigate(dashboard);
            } else {
                const currentTableKey = excel + ActiveRoute.param;
                const decision = confirm("Вы действительно хотите удалить таблицу?");

                if (decision) {
                    localStorage.removeItem(currentTableKey);
                    ActiveRoute.navigate(dashboard);
                }
            }
        }
    }
}