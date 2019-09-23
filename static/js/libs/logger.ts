import API from './api';

export default class Logger {
    private url: string;
    private stack: Array<object>;

    constructor(url: string, ...params: any[]) {
        this.url = url;
        this.stack = [];
    }

    getLogger() {
        return this;
    }

    setConfig(url: string, ...params: any[]) {
        this.url = url;
    }

    addLog(log: object) {
        if (this.stack.length === 10) {
            this.sendLogs();
        }

        this.stack.push(log);
    }

    sendLogs() {
        const logsToSend = this.stack;
        this.clearStack();
        return API.sendLogs(this.url, logsToSend);
    }

    clearStack() {
        this.stack.length = 0;
    }
}