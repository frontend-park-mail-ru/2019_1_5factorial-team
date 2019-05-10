
export default class EventBus {
    private list: Map<String, Function[]>
    constructor(events: Array<String>) {
        this.list = new Map();
        events.forEach((name) => {
            this.list.set(name, []);
        });
    }


    /**
     * Ждем события с определенным именем
     * @param {*} name Имя нашего события
     * @param {*} callback Функция, которую выполняем при вызове
     */
    getEvent(name: String, callback: Function) {
        if (!this.list.has(name)) {
            console.log(`Unknown event ${name}`);
        }
        this.list.get(name).push(callback);
    }


    /**
     * Отвечаем на event callback'ами
     * @param {*} name Имя нашего события
     * @param  {...any} args 
     */
    callEvent(name: String, ...args: any[]) {
        if (!this.list.has(name)) {
            console.log(`Unknown event ${name}`);
        }
        const listener = this.list.get(name);
        listener.forEach((callback: Function) => {
            callback(...args);
        });
    }
}