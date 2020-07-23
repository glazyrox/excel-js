import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

import { $ } from '../../core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(26);
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            let pageAxis = 'pageX';
            let dataAttribute = 'col'
            let moveSide = 'right';
            let spotMove = 'width';


            const $resizer = $(event.target);
            // const $parent = $resizer.$el.parentNode; // bad cus js-logic vs view-logic
            // const $parent = $resizer.$el.closest('.column'); too bad cus js-logic vs view-logic
            const $parent = $resizer.closest('[data-type="resizable"]'); // ближайший родитель по дата-атрибуту
            const coords = $parent.getCoords(); // коорды элемента
            const colAtribute = $parent.data.col;
            // const editableElems = Array.from(document.querySelectorAll(`[data-${attribute}="${colAtribute}"]`)); // query to doc is slow

            if ($parent.data.elem) {
                pageAxis = 'pageY';
                dataAttribute = 'row'
                moveSide = 'bottom';
                spotMove = 'height';
            }

            const editableElems = Array.from(this.$root.findAll(`[data-${dataAttribute}="${colAtribute}"]`));
            let value;

            document.onmousemove = e => {
                const delta = e[pageAxis] - coords[moveSide];
                value = (coords[spotMove] + delta);
            }

            document.onmouseup = () => {
                console.log(editableElems);
                editableElems.map(item => item.style[spotMove] = value + 'px');
                document.onmousemove = null; // delete mousemove for speed
            }
        }
    }
}