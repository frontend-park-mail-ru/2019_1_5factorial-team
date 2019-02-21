// kek
const app = document.getElementById('app');

const inputPhotoForm = document.getElementById('upload-photo');

const submitUpload = document.getElementsByClassName('btn btn-default')[0];

submitUpload.addEventListener('click', (event) => {
    console.log(event);
    event.preventDefault();

    alert('111');
});