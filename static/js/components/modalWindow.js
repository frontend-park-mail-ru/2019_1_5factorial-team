import { MAP_OF_MODALS } from './constants.js';

export default class ModalWindow {

    createModal(element) {
        console.log('!');
        const modalElement = document.getElementsByClassName('modal-window')[0];
        modalElement.classList.remove('hide');
        modalElement.innerHTML = '<div class="blur"></div><div class="modal"><div class="content content_modal"><h1 class="content__header content__header_modal">Change password</h1></div></div>';
        const divToAppend = document.getElementsByClassName('content_modal')[0];
        const temp = MAP_OF_MODALS.get(element);
        divToAppend.innerHTML = temp;

        this.closeMW = document.getElementsByClassName('js-close-mw')[0];
        this.blur = document.getElementsByClassName('blur')[0];

        if (this.blur !== undefined) {
            this.blur.addEventListener('click', (event) => {
                event.preventDefault();
                this.removeModal();
            });
        }

        if (this.closeMW !== undefined) {
            this.closeMW.addEventListener('click', (event) => {
                event.preventDefault();
                this.removeModal();
            });
        }
    }

    removeModal() {
        const modalElement = document.getElementsByClassName('modal-window')[0];
        modalElement.classList.add('hide');
        modalElement.innerHTML = '';
    }
}