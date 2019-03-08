const noop = () => null;

export default class paginator {
    /**
     * Создает пагинатор
     * @param pagesCount сколько всего страниц в пагинаторе
     * @param linksCount сколько кнопок в пагинаторе
     * @param clickCallback действие при клике на кнопку
     * @param styleClassesCurrent стили для кнопки, которая указывает на текущую страницу
     * @param styleClassesOther общие стили для кнопки
     */
    constructor ({ countOfPages, numOfPositions, callbackOnClick = noop } = {}) {
        this.localCountOfPages = countOfPages;
        this.localNumOfPositions = numOfPositions;
        this.localCallbackOnClick = callbackOnClick;
        this.localLinks = [];

        this.firstPos = 1;
        this.lastPos = (this.localNumOfPositions < this.localCountOfPages ? this.localNumOfPositions : this.localCountOfPages);

        for (let i = this.firstPos - 1; i < this.lastPos; i++) {
            this.localLinks.push(document.createElement('div'));
            this.localLinks[i].addEventListener('click', this.onLinkClick.bind(this));
            this.localLinks[i].textContent = i + 1;
        }
    }

    /**
     * Вставляет пагинатор в root элемент
     * @param root
     */
    render (root) {
        root.innerHTML = '';
        // Отменить выделение блока
        root.addEventListener('mousedown', (event) => event.preventDefault());
        this.localLinks.forEach(val => root.appendChild(val));
    }

    onLinkClick (event) {
        event.preventDefault();
        const linkStr = event.target.textContent;

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

    localChanges (firstNum, lastNum) {
        this.firstPos = firstNum;
        this.lastPos = (lastNum >= this.localCountOfPages ? this.localCountOfPages : lastNum);
        this.localLinks.forEach(val => val.textContent = firstNum++);
    }
}
