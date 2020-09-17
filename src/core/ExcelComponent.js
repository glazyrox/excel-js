import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {

    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emmiter = options.emmiter;
        this.unsubscribes = [];
        this.subscribe = options.subscribe || [];
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

    // инициализируем компонент и слушателей
    init() {
        this.initDOMListeners();
    }

    // EMMITER
    // подписываемся на события эвент
    $on(event, fn) {
        const unsub = this.emmiter.subscribe(event, fn);
        this.unsubscribes.push(unsub);
    }

    // уведомляем слушателей о событиях эвент
    $emit(event, ...args) {
        this.emmiter.emit(event, ...args);
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    isWatching(key) {
        return this.subscribe.includes(key);
    }

    // storeChanged(store) {
    //     console.log(store);
    // }

    // удаляем и чистим слушателей
    destroy() {
        this.unsubscribes.forEach(unsub => unsub());
        this.storeSub?.unsubscribe();
        
        this.removeDOMListeners();
    }
}