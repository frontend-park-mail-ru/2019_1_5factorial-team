// kek
'use strict';

const submitUpload = document.getElementsByClassName('small-btn-light')[0];

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
// в случае удачи, получает новую картинку пользователя и кладет ее в img_container
submitUpload.addEventListener('click', (event) => {
    event.preventDefault();

    const userAvatar = document.getElementsByClassName('js-change-image')[0].files[0];


    let nickname = 'kek1';

    let formData = new FormData();
    formData.append('avatar', userAvatar);
    formData.append('nickname', nickname);

    ajax((xhr) => {
        let img_container = document.getElementById('album');

        const source = JSON.parse(xhr.responseText);
        const image = document.createElement('IMG');

        // checking returned error
        if (source.error !== undefined) {
            return;
        }

        image.src = source;
        img_container.appendChild(image);
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
        // img_container.appendChild(image);
    }, 'POST', '/avatar', {
        nickname: username,
    }, false);
}

getUserAvatar('kek');