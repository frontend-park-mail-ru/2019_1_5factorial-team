import { MAP_OF_MODALS } from '../constants';

import './modalWindow.scss';

export default class ModalWindow {
    
    isGame: Boolean;
    noCase: Element;
    closeMW: Element;
    blur: Element;
    gameOverBackMenu: Element;
    header: Element;

    createModal(element: String, room?: string): void {
        const modalElement = document.getElementsByClassName('js-modal-window')[0];
        this.isGame = false;
        if (element === 'Game single end' || 
            element === 'Game multi choose' ||
            element === 'Menu multi waiting for player') {
            this.isGame = true;
        }

        modalElement.classList.remove('hidden');
        modalElement.innerHTML = '<div class="blur"></div><div class="modal"><div class="content content_modal"></div></div>';
        const divToAppend = document.getElementsByClassName('content_modal')[0];
        const elemToRender = MAP_OF_MODALS.get((element as string));
        divToAppend.innerHTML = elemToRender;

        this.noCase = document.getElementsByClassName('js-skip-training')[0];
        this.closeMW = document.getElementsByClassName('js-close-mw')[0];
        this.blur = document.getElementsByClassName('js-blur')[0];
        this.gameOverBackMenu = document.getElementsByClassName('js-back-to-menu-modal')[0];

        if (this.noCase !== undefined) {
            this.noCase.addEventListener('click', (event) => {
                event.preventDefault();
                this.removeModal();
            });
        }

        if (this.blur !== undefined && !this.isGame) {
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

        if (this.gameOverBackMenu !== undefined) {
            this.gameOverBackMenu.addEventListener('click', () => {
                this.removeModal();
            });
        }

        if (room) {
            this.header = document.getElementsByClassName('js-set-text')[0];
            this.header.textContent = room;
        }
    }

    removeModal(): void {
        const modalElement = document.getElementsByClassName('js-modal-window')[0];
        const toDeleteModal = document.getElementsByClassName('content content_modal')[0];
        if (toDeleteModal) {
            modalElement.classList.add('hidden');
            toDeleteModal.remove();
            this.isGame = false;
        }
    }
}