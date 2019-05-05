import { FIRST_POS } from '../constants.js';

import './pagination.scss';

const noop = () => null;

export default class paginator {
    /**
     * Создает пагинатор
     * @param countOfPages сколько всего страниц в пагинаторе
     * @param numOfPositions сколько кнопок в пагинаторе
     * @param callbackOnClick действие при клике на кнопку
     */
    constructor({ countOfPages, numOfPositions, callbackOnClick = noop } = {}) {
        this.localCountOfPages = countOfPages;
        this.localNumOfPositions = numOfPositions;
        this.localCallbackOnClick = callbackOnClick;
        this.localLinks = [];

        this.firstPos = FIRST_POS;
        this.lastPos = (this.localNumOfPositions < this.localCountOfPages ? this.localNumOfPositions : this.localCountOfPages);

        // TODO(): сделать две кнопки - First page и Last page для проброски в начало и конец
        for (let i = this.firstPos - 1; i < this.lastPos; i++) {
            const paginatorElem = document.createElement('div');
            paginatorElem.classList.add('paginator__page');
            this.localLinks.push(paginatorElem);
            this.localLinks[i].addEventListener('click', this.onLinkClick.bind(this));
            this.localLinks[i].textContent = i + 1;
        }
        this.localLinks[0].classList.add('active-pagination');
    }

    /**
     * Вставляет пагинатор в root элемент
     * @param root
     */
    render(root) {
        root.innerHTML = '';
        this.localLinks.forEach(element => root.appendChild(element));
    }

    // TODO(4taa): поправить ифы + намазать JSDoc
    /**
     * Отрисовка страниц с учетом того, на какой находимся
     * @param {*} event
     */
    onLinkClick(event) {
        event.preventDefault();
        const linkStr = event.target.textContent;
        const element = event.target;
        this.localLinks.forEach(element => element.classList.remove('active-pagination'));
        element.classList.add('active-pagination');

        if (typeof +linkStr === 'number') {
            const linkNum = +linkStr;

            if (linkNum === (this.lastPos + this.firstPos) / 2 ||
                (linkNum < (1 + this.localNumOfPositions) / 2 && this.firstPos === 1) ||
                (linkNum > (this.localCountOfPages - this.localNumOfPositions + this.localCountOfPages) / 2 &&
                    this.lastPos === this.localCountOfPages) ||
                linkNum === this.localCountOfPages) {
                this.localChanges(this.firstPos, this.lastPos, linkNum);
            } else if (linkNum > (this.lastPos + this.firstPos) / 2) {
                this.localChanges(this.firstPos + 1, this.lastPos + 1, linkNum);
            } else if (linkNum < (this.lastPos + this.firstPos) / 2) {
                this.localChanges(this.firstPos - 1, this.lastPos - 1, linkNum);
            }

            this.localCallbackOnClick(linkNum);
        }
    }

    localChanges(firstNum, lastNum) {
        this.firstPos = firstNum;
        this.lastPos = (lastNum >= this.localCountOfPages ? this.localCountOfPages : lastNum);
        this.localLinks.forEach(val => val.textContent = firstNum++);
    }
}
