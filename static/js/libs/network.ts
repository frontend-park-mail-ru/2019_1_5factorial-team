import { NETWORK_ADRESS } from '../components/constants';

export default class Network {
    /**
    * Пост запрос, с JSON body
    * @param url
    * @param body
    * @param host
    * @returns {Promise<Response>}
    */
    static doPost({ url = '/', body = {}, host = Network.getServerURL() } = {}): Promise<Response> {
        return fetch(host + url, {
            method: 'POST',
            body: JSON.stringify(body),
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
    }

    /**
    * Get запрос
    * @param url
    * @returns {Promise<Response>}
    */
    static doGet({ url = '/' } = {}): Promise<Response> {
        return fetch(Network.getServerURL() + url, {
            method: 'GET',
            credentials: 'include',
        });
    }

    /**
    * Delete запрос
    * @param url
    * @param body
    * @returns {Promise<Response>}
    */
    static doDelete({ url = '/' } = {}): Promise<Response> {
        return fetch(Network.getServerURL() + url, {
            method: 'DELETE',
            credentials: 'include',
        });
    }

    /**
     * Get на урл сервера
     */
    static getServerURL(): string {
        return NETWORK_ADRESS;
    }

    /**
    * Put запрос, с JSON body
    * @param url
    * @param body
    * @returns {Promise<Response>}
    */
    static doPut({ url = '/', body = {} } = {}): Promise<Response> {
        return fetch(Network.getServerURL() + url, {
            method: 'PUT',
            body: JSON.stringify(body),
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
    }

    /**
    * Post запрос с multipart form data. Fetch сам выставляет необходимые заголовки
    * @param url
    * @returns {Promise<Response>}
    */
    static doPostFormData(data: {url: string | String, body: BodyInit} = {url: '/', body: null }): Promise<Response> {
        return fetch(Network.getServerURL() + data.url, {
            method: 'POST',
            body: data.body,
            mode: 'cors',
            credentials: 'include'
        });
    }
}

export const  doGet = async ({ url = '/' } = {}): Promise<Response> => {
    return fetch(Network.getServerURL() + url, {
        method: 'GET',
        credentials: 'include',
    });
}