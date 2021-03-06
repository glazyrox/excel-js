class Dom {
    constructor(selector) {
        this.$el = typeof(selector) === 'string' 
        ? document.querySelector(selector)
        : selector;
    }

    html(html) {
        if (typeof(html) === 'string') {
            this.$el.innerHTML = html;

            return this;
        }

        return this.$el.outerHTL.trim();
    }
    
    focus() {
        this.$el.focus();
        return this.$el;
    }

   clear() {
        this.html('');

        return this;
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }
    
    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }

    find(selector) {
        return $(this.$el.querySelector(selector));
    } 

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node)
        }

        return this
    }

    get data() {
        return this.$el.dataset;
    }

    id() {
        return this.$el.dataset.id;
    }

    text(text) {
        if (text !== undefined) {
            this.$el.textContent = text;
            return this.$el;
        }

        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim();
        }
        return this.$el.textContent.trim();
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    css(styles = {}) {
        Object
            .keys(styles)
            .forEach(key => {
                this.$el.style[key] = styles[key];
            })
    }

    getStyles(styles = []) {
        return styles.reduce((res, current) => {
            res[current] = this.$el.style[current];
            return res
        }, {})
    }

    addClass(className) {
        this.$el.classList.add(className);
    }

    removeClass(className) {
        this.$el.classList.remove(className);
    }

    attr(name, value = null) {
        if (value) {
            this.$el.setAttribute(name, value);
            return this
        } 
        return this;
    }
}

export function $(selector) {

    return new Dom(selector);
}

$.create = (tagName, classes = '') => {
    const elem = document.createElement(tagName);
    
    if (classes) {
        elem.classList.add(classes)
    }

    return $(elem);
}