// kek
'use strict';

const app = document.getElementById('app');

const inputPhotoForm = document.getElementById('upload-photo');

const submitUpload = document.getElementsByClassName('btn btn-default')[0];

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
    event.preventDefault();

    const userAvatar = document.getElementsByClassName('photo-input')[0].files[0];

    // pseudoValidation (kek)
    if ((userAvatar.type !== "image/png") && (userAvatar.type !== "image/jpeg")) {
        alert('only jpeg or png photos!!');
        return;
    }

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

function getUserAvatar(username) {
    let img_container = document.getElementById('album');

    let formData = new FormData();
    formData.append('nickname', username);

    ajax((xhr) => {
        const source = JSON.parse(xhr.responseText);
        const image = document.createElement('IMG');
        image.src = source;
        img_container.appendChild(image);
    }, 'POST', '/avatar', {
        nickname: username,
    }, false);
}

getUserAvatar('kek');