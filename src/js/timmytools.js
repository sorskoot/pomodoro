window.$ = (selector) => document.querySelectorAll(selector);

Object.assign(NodeList.prototype, {
    addEventListener(event, handler) {
        for (let i = 0; i < this.length; i++) {
            this[i].addEventListener(event, handler);
        }
    }
});