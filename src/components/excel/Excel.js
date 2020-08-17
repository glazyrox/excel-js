import { $ } from "@core/dom";
import { Emmiter } from "../../core/Emmiter";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || [];
        this.emmiter = new Emmiter();
        this.store = options.store;
    }

    getRoot() {
        const $root = $.create('div', 'excel');
        const componentOptions = { 
            emmiter: this.emmiter,
            store: this.store,
        }

        this.components = this.components.map(Component => { // массив классов
            const $el = $.create('div', Component.className); // див с классом
            const component = new Component($el, componentOptions); // экземпляр класса (инстанс)
            $el.html(component.toHTML()); // создает компонент из текста тэгов
            $root.append($el); // добавляет готовый хтмл

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

    destroy() {
        this.components.forEach(component => component.destroy());
    }
}