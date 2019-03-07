
export default class View {
    constructor(tmpl, eventBus) {
        this.element = document.createElement('div');
        this.element.classList.add('wrapper');
        this.tmpl = tmpl;
        this._eventBus = eventBus;
        this.prevRoot = null;
        this.closedView = false;
        this.fest = window.fest[tmpl];
    }
  
    /**
       * Функция рендера с сохранением предыдущей страницы в prevRoot
       * @param root, если null, то рендерится this.prevRoot
       * @param data
       * @returns {View}
       */
    render(root) {
        this.closedView = false;
        if (root === undefined || root === null) {
            root = this.prevRoot;
        } else {
            this.prevRoot = root;
        }
  
        // this.element.innerHTML = this.tmpl(data);
        root.innerHTML = this.fest();
        // root.appendChild(this.element);
  
        return this;
    }
  
    close() {
        this.closedView = true;
        try {
            this._eventBus.triggerEvent('vcl');
        } catch (e) {
            console.log('no such event - close');
        }
    }
  
    hide(root) {
        root.innerHTML = '';
        return this;
    }
}