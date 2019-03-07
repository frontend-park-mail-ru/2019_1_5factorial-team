import menuButton from '../menuBtns/menuBtns.js';

export default class Menu {
    constructor(list = []) {
        this.divs = [];
        list.forEach((button) => {
            const buttonDiv = document.createElement('div');
            new menuButton(button).render(buttonDiv);
            this.divs.push(buttonDiv);
        });
    }

    render(root) {
        root.innerHTML = '';
        this.divs.forEach((buttonDiv) => {
            root.appendChild(buttonDiv);
        });
    }
}