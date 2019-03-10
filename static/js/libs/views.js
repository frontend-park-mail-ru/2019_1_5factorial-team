
export default class View {
    constructor(tmpl, eventBus) {
        this.element = document.createElement('div');
        this.element.classList.add('wrapper');
        this.tmpl = tmpl;
        this.localEventBus = eventBus;
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
    render(root, data) {
        this.closedView = false;
        if (root === undefined || root === null) {
            root = this.prevRoot;
        } else {
            this.prevRoot = root;
        }

        // this.data = data; // Заглушка для линтера
        // this.element.innerHTML = this.tmpl(data);
        root.innerHTML = this.fest(data);
        root.appendChild(this.element);

        return this;
    }

    close() {
        this.closedView = true;
        try {
            this.localEventBus.callEvent('vcl');
        } catch (e) {
            console.log('no such event - close');
        }
    }

    hide(root) {
        root.innerHTML = '';
        return this;
    }
}
