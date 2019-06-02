export default class Router {
    private root: any;
    private routes: Map<String, {root: any, view: any, data: Object}>;
    private currentRoute: String;
    private isCurrentNotFound: Boolean;

    private notFoundView: any;
    private notFoundViewRoot: any;

    constructor(root: Element) {
        this.root = root;
        this.routes = new Map();

        this.currentRoute = null;
        this.isCurrentNotFound = false;

        window.addEventListener('popstate', () => {
            const pathname = Router.normalizePath(location.pathname);
            this.change(pathname, false);
        });
    }

    /**
     * Переходит на начальную страницу с путем '/'
     * @param delPrev удаляет из истории Путь из которого сделан переход
     */
    toStartPage(delPrev: Boolean = false) {
        if (delPrev) {
            window.history.replaceState(null, null, '/');
        }

        this.change('/', !delPrev);
    }

    /**
     * Добавляет маршрут для роутера.
     * @param path путь при переходе на который будет вызвана view
     * @param root элемент куда будет рисоваться view, по-умолчание это this.root
     * @param view компонент, который отрисуется
     * @param data router data
     */
    add(path: String, root = this.root, view: any, data?: Object) {
        this.routes.set(path, {
            root,
            view,
            data
        });
    }

    /**
     * Устанавливает View компонент, который будет отрисовываться, если не найден запрашиваемый маршрут
     * @param root элемент куда будет рисоваться view, по-умолчание это this.root
     * @param view компонент, который отрисуется
     */
    setNotFoundView(root = this.root, view: any) {
        this.notFoundView = view;
        this.notFoundViewRoot = root;
    }

    /**
     * Переход на маршрут с путем path
     * @param path путь
     * @param addToHistory добавлять Path в History Api или нет.
     * @private
     */
    change(path: String, addToHistory: Boolean = true) {
        if (this.currentRoute === path) {
            return;
        }

        const currentData = this.routes.get(this.currentRoute);
        if (currentData) {
            currentData.view.close();
            currentData.view.hide(currentData.root);
        }

        if (this.isCurrentNotFound) {
            // this.toStartPage();
            this.notFoundView.close();
            this.notFoundView.hide(this.notFoundViewRoot);
        }

        if (addToHistory) {
            window.history.pushState(null, null, (path as string));
        }

        if (this.routes.has(path)) {
            let route = this.routes.get(path);
            route.view.render(route.data);
            this.currentRoute = path;
        } else {
            this.toStartPage();
        }
    }

    /**
     * Удаляет суффикс '/', если path != '/'
     * @param path
     * @returns {string}
     * @private
     */
    static normalizePath(path: String): String {
        return path.charAt(path.length - 1) === '/' && path !== '/' ? path.slice(0, path.length - 1) : path;
    }

    /**
     * Запускает роутер
     */
    start() {
        this.root.addEventListener('click', (event: any) => {
            if (event.target.tagName === 'A' && event.target.hostname === location.hostname) {
                event.preventDefault();
                this.change(Router.normalizePath(event.target.pathname));
            }
        });

        this.change(Router.normalizePath(window.location.pathname), false);
    }
}