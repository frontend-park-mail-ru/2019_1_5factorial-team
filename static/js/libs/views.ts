import EventBus from "./eventBus";

export default class View {
    element: Element;
    tmpl: (data: any) => any;
    localEventBus: EventBus;
    prevRoot: any;
    closedView: Boolean;
    constructor(tmpl: any, eventBus: EventBus) {
        this.element = document.createElement('div');
        this.tmpl = tmpl;
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
    render(root: Element, data: { users?: any; }) {
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
            console.log('no such event - close');
        }
    }

    hide(root: { innerHTML: string; }) {
        root.innerHTML = '';
        return this;
    }
}
