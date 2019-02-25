'use strict';

import Validator from './validation'

const submitUpload = document.getElementsByClassName('js-submit')[0];

/**
 * Отправляет асинхронный запрос на сервер
 *
 * @param {*} callback - функция, выполняющаяся после ответа сервера на запрос
 * @param {*} method - POST/GET
 * @param {*} path - куда идет запрос
 * @param {*} body - тело запроса
 * @param {*} isFile - если true - не ставит хэдр и не оборачивает тело запроса
 */
function ajax (callback, method, path, body, isFile) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, path, true);
    xhr.withCredentials = true;

    if (body && !isFile) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        callback(xhr);
    };

    if (body) {
        if (isFile) {
            xhr.send(body);
        } else {
            xhr.send(JSON.stringify(body));
        }
    } else {
        xhr.send();
    }
}

submitUpload.addEventListener('click', (event) => {
    const firstPass = document.getElementsByClassName('js-password')[0];
    const secondPass = document.getElementsByClassName('js-password-repeat')[0];

    let nickname = 'kek1';

    let validate = new Validator();
    let formData = new FormData();

    if (validate.validateRepeatPasswords(firstPass, secondPass)) {
        console.log('Changes applied!');
        formData.append('password', password);
        formData.append('nickname', nickname);
    } else {
        console.log('Passwords dont match!');
        return;
    }

    ajax((xhr) => {
        let img_container = document.getElementById('album');

        const source = JSON.parse(xhr.responseText);
        const image = document.createElement('IMG');

        // checking returned error
        if (source.error !== undefined) {
            return;
        }

    }, 'POST', '/profile', formData, true);
});


/**
 * Получает асинхронно аватарку пользователя
 * @param {*} username - ник пользователя
 */
function getUserAvatar(username) {
    // кладет новую фотку в контейнер
    let img_container = document.getElementById('album');

    let formData = new FormData();
    formData.append('nickname', username);

    ajax((xhr) => {
        // создание элемента img в img_container
        const source = JSON.parse(xhr.responseText);
        const image = document.createElement('IMG');

        // checking returned error
        if (source.error !== undefined) {
            return;
        }

        image.src = source;
        img_container.appendChild(image);
    }, 'POST', '/avatar', {
        nickname: username,
    }, false);
}

getUserAvatar('kek');