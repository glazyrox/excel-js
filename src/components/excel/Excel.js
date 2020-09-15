import { $ } from "@core/dom";
import { Emmiter } from "../../core/Emmiter";
import { StoreSubscriber } from "../../core/StoreSubscriber";

export class Excel {
    constructor(options) {
        this.components = options.components || [];
        this.emmiter = new Emmiter();
        this.store = options.store;
        this.subscriber = new StoreSubscriber(this.store);
    }

    getRoot() {
        const $root = $.create('div', 'excel');

        const componentOptions = { 
            emmiter: this.emmiter,
            store: this.store,
        }

        this.components = this.components.map(Component => { // массив классов
            const $el = $.create('div', Component.className); // див с классом
            const component = new Component($el, componentOptions); // экземпляр класса компонента(инстанс)
            $el.html(component.toHTML()); // создает компонент из текста тэгов
            $root.append($el); // добавляет готовый хтмл

            return component;
        })

        return $root;
    }

    init() {
        this.subscriber.subscribeComponents(this.components);
        this.components.forEach(component => component.init());
    }

    destroy() {
        this.subscriber.unsubscribeFromStore();
        this.components.forEach(component => component.destroy());
    }
}