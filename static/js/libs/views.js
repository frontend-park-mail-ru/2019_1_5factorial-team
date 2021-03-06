export default class View {
    constructor(tmpl, eventBus, logger) {
        this.element = document.createElement('div');
        this.tmpl = tmpl;
        this.logger = logger;
        this.localEventBus = eventBus;
        this.prevRoot = null;
        this.closedView = false;
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
        this.element.innerHTML = this.tmpl(data);
        root.innerHTML = '';
        root.appendChild(this.element);
        return this;
    }

    /**
     * Закрываем вьюшку по вызову события
     */
    close() {
        this.closedView = true;
        try {
            this.localEventBus.callEvent('close');
        } catch (e) {
            this.logger.addLog({type: 'eventBus', msg: 'No such event - close for view'});
        }
    }

    hide(root) {
        root.innerHTML = '';
        return this;
    }
}