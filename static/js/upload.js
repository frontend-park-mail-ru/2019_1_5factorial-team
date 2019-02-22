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
    // console.log(event);
    event.preventDefault();

    let userAvatar = document.getElementsByClassName('photo-input')[0].files[0];
    console.log(userAvatar)

    // pseudoValidation (kek)
    console.log(userAvatar.type);

    // if (userAvatar.type !== 'image/png' || userAvatar.type !== 'image/jpeg') {
    //     alert('ti debil tol`ko png ili jpeg');
    //     return;
    // }
    let nickname = 'kek';

    let formData = new FormData();
    formData.append('avatar', userAvatar);
    formData.append('nickname', nickname);

    console.log(formData.get('avatar'));

    ajax((xhr) => {
        let img_container = document.getElementById('album');

        const source = JSON.parse(xhr.responseText);
        const image = document.createElement('IMG');
        image.src = source;
        console.log(source);
        img_container.appendChild(image);
    }, 'POST', '/profile', formData, true);
});

function getUserAvatar(username) {
    let img_container = document.getElementById('album');

    let formData = new FormData();
    formData.append('nickname', username);

    // debugger;
    ajax((xhr) => {
        const source = JSON.parse(xhr.responseText);
        const image = document.createElement('IMG');
        image.src = source;
        console.log(source);
        img_container.appendChild(image);
    }, 'POST', '/avatar', {
        nickname: username,
    }, false);
}

getUserAvatar('kek');