export class Emmiter {
    constructor() {
        this.listeners = {}
    }

    // emitter, fire, dispatch
    // уведомляем слушателей
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false;
        }

        this.listeners[event].forEach(listener => {
            listener(args);
        })

        return true;
    }

    // on, listen 
    // подписка на уведомления
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);

        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
        }
    }
}

const emmiter = new Emmiter;

const unsub = emmiter.subscribe('sosat', data => console.log(data));

unsub();

emmiter.emit('sosat', 'sosy');