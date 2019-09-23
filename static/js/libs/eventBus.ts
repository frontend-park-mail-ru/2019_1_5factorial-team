import Logger from './logger';

export default class EventBus {
    private list: Map<String, Function[]>
    private logger: Logger;
    constructor(events: Array<String>) {
        this.list = new Map();
        this.logger = new Logger('/api/frontlogs');
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
            this.logger.addLog({type: 'eventBus', msg: 'No such event'})
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
            this.logger.addLog({type: 'eventBus', msg: 'No such event'})
        }
        const listener = this.list.get(name);
        listener.forEach((callback: Function) => {
            callback(...args);
        });
    }
}