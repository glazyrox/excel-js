export class TableSelection {
    static className = 'selected';

    constructor() {
        this.group = [];
        this.pivotItem;
    }

    select($el) { // $el instanceof class DOM
        this.clear();
        $el.focus();
        this.group = [];

        this.group.push($el);
        this.pivotItem = $el;
        $el.addClass(TableSelection.className);
    }

    selectGroup(selectedGroupItems) {
        this.clear();
        this.group = selectedGroupItems;
        
        this.setSelect();
    }

    clear() {
        this.group.forEach(item => item.removeClass(TableSelection.className));
    }

    setSelect() {
        this.group.forEach(item => item.addClass(TableSelection.className));
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }
}