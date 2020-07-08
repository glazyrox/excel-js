import { $ } from "@core/dom";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || [];
    }

    getRoot() {
        const $root = $.create('div', 'excel');

        this.components = this.components.map(Component => { // массив классов
            const $el = $.create('div', Component.className); // див с классом
            const component = new Component($el); // экземпляр класса (инстанс)
            $el.html(component.toHTML()); // создает компонент из текста тэгов
            $root.append($el); // добавляет в эксель готовый хтмл

            return component;
        })

        return $root;
    }

    render() {
        this.$el.append(this.getRoot());

        this.components.forEach(component => {
            component.init();
        })
    }
}