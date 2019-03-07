// kek
'use strict';

const submitUpload = document.querySelector('.js-change-image');
ghjghjgjghj
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

// загрузка картинки на сервер для полтзователя с ником nickname (в теле функции)
// через FormData, есть проверка на png/jpeg
// в случае удачи, получает новую картинку пользователя и обновляет текущую (setUserAvatars)
submitUpload.addEventListener('change', (event) => {
    event.preventDefault();

    const userAvatar = document.getElementsByClassName('js-change-image')[0].files[0];
    
    // pseudoValidation (kek)
    if ((userAvatar.type !== 'image/png') && (userAvatar.type !== 'image/jpeg')) {
        alert('only jpeg or png photos!!');
        return;
    }

    // nickname will get from cookie
    // or id, will be decided when backend would be done
    const nickname = 'kek';

    const formData = new FormData();
    formData.append('avatar', userAvatar);
    formData.append('nickname', nickname);

    ajax((xhr) => {
        const source = JSON.parse(xhr.responseText);
        setUserAvatar(source);
    }, 'POST', '/profile', formData, true);
});

/**
 * Получает асинхронно аватарку пользователя
 * 
 * @param {*} username - ник пользователя
 */
function getUserAvatar (username) {
    // кладет новую фотку в контейнер

    const formData = new FormData();
    formData.append('nickname', username);

    ajax((xhr) => {
    // создание элемента img в img_container
        const source = JSON.parse(xhr.responseText);
        setUserAvatar(source);
    }, 'POST', '/avatar', {
        nickname: username
    }, false);
}

getUserAvatar('kek');
/**
 * получает сурс картинки и меняет src у current-avatar
 * 
 * @param {*} source - сурс новой автарки
 * @returns
 */
function setUserAvatar(source) {
    if (source.error !== undefined) {
        return;
    }
    const current_avatar = document.querySelector('.avatar-img');
    current_avatar.src = source;
}