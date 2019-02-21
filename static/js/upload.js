// kek
'use strict';

const app = document.getElementById('app');

const inputPhotoForm = document.getElementById('upload-photo');

const submitUpload = document.getElementsByClassName('btn btn-default')[0];

function ajax (callback, method, path, body) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, path, true);

    if (body) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    }

    xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) {
			return;
		}

		callback(xhr);
	};

	if (body) {
		xhr.send(JSON.stringify(body));
	} else {
		xhr.send();
	}
}

submitUpload.addEventListener('click', (event) => {
    console.log(event);
    event.preventDefault();

    let userAvatar = document.getElementsByClassName('photo-input')[0].files[0];
    console.log(userAvatar)

    // pseudoValidation (kek)
    if (userAvatar.type !== 'image/png' || userAvatar.type !== 'image/jpg') {
        alert('ti debil tol`ko png ili jpeg');
        return;
    }

    formData = new FormData();

    alert('111');
});