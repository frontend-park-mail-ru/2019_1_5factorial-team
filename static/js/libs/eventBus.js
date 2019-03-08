
export default class EventBus {
    constructor(events) {
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
    getEvent(name, callback) {
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
    callEvent(name, ...args) {
        if (!this.list.has(name)) {
            console.log(`Unknown event ${name}`);
        }
        const listener = this.list.get(name);
        listener.forEach((callback) => {
            callback(...args);
        });
    }
}