import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {

    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emmiter = options.emmiter;
        this.unsubscribes = [];
        this.store = options.store;
        this.storeSub = null;
        this.prepare();
    }

    // настраиваем компонент до инита
    prepare() {
        
    }

   toHTML() {
        return '';
    }

    // уведомляем слушателей о событиях эвент
    $emit(event, ...args) {
        this.emmiter.emit(event, ...args);
    }

    // подписываемся на события эвент
    $on(event, fn) {
        const unsub = this.emmiter.subscribe(event, fn);
        this.unsubscribes.push(unsub);
    }

    // инициализируем компонент и слушателей
    init() {
        this.initDOMListeners();
    }

    // удаляем и чистим слушателей
    destroy() {
        this.unsubscribes.forEach(unsub => unsub());
        this.storeSub.unsubscribe();
        this.removeDOMListeners();
    }

    $subscribe(fn) {
        this.storeSub = this.store.subscribe(fn);
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }
}