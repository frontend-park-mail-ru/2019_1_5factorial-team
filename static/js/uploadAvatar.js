// kek
'use strict';

const submitUpload = document.querySelector('.js-change-image');

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
submitUpload.addEventListener('change', (event) => {
    event.preventDefault();
    // debugger;
    const userAvatar = document.getElementsByClassName('js-change-image')[0].files[0];
    console.log(userAvatar);

    // document.getElementsByClassName('profile-avatar-block')[0].removeChild(document.getElementsByClassName('avatar-img')[0]);
    
    // pseudoValidation (kek)
    if ((userAvatar.type !== "image/png") && (userAvatar.type !== "image/jpeg")) {
        alert('only jpeg or png photos!!');
        return;
    }

    let nickname = 'pashaPidor';

    let formData = new FormData();
    formData.append('avatar', userAvatar);
    formData.append('nickname', nickname);

    console.log(formData.get('avatar'));

    ajax((xhr) => {
        let img_container = document.getElementsByClassName('profile-avatar-block')[0];

        const source = JSON.parse(xhr.responseText);
        const image = document.createElement('IMG');

        // checking returned error
        if (source.error !== undefined) {
            return;
        }

        image.src = source;
        image.classList.add('avatar-img');
        // img_container.appendChild(image);
        img_container.replaceChild(image, document.getElementsByClassName('avatar-img')[0])
    }, 'POST', '/profile', formData, true);
});

/**
 * Получает асинхронно аватарку пользователя
 * @param {*} username - ник пользователя
 */
function getUserAvatar(username) {
    // кладет новую фотку в контейнер

    let formData = new FormData();
    formData.append('nickname', username);

    ajax((xhr) => {
        // создание элемента img в img_container
        let img_container = document.getElementsByClassName('profile-avatar-block')[0];

        const source = JSON.parse(xhr.responseText);
        const image = document.createElement('IMG');

        // checking returned error
        if (source.error !== undefined) {
            return;
        }

        image.src = source;
        image.classList.add('avatar-img');
        // img_container.appendChild(image);
        img_container.replaceChild(image, document.getElementsByClassName('avatar-img')[0])
    }, 'POST', '/avatar', {
        nickname: username,
    }, false);
}

getUserAvatar('pashaPidor');