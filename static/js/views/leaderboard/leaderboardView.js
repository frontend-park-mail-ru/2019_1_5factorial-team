import View from '../../libs/views.js';
import paginator from '../../libs/pagination.js';

export default class leaderboardView extends View {
    constructor({ eventBus = {} }) {
        super('leaderboardView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('loadResponse', this.loadResponse.bind(this));
        this.localEventBus.getEvent('loadWaiting', this.loadWaiting.bind(this));
        this.localEventBus.getEvent('loadPaginationResponse', this.loadPaginatorResponse.bind(this));
        this.pagination = null;
        this.isClosed = false;
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('loadPaginator');
        this.localEventBus.callEvent('load', { pageNum: 1 });
    }

    loadPaginatorResponse (data) {
        if (data.pagesCount !== undefined && data.linksCount !== undefined) {
            const callbackOnClick = (pageNum) => {
                this.localEventBus.callEvent('load', { pageNum });
            };

            const root = this.element.querySelector('.paginator');
            this.pagination = new paginator({
                countOfPages: data.pagesCount,
                numOfPositions: data.linksCount,
                callbackOnClick
            });
            this.pagination.render(root);
        } else {
            console.error('There is no pageCount or linksCount, while creating Paginator');
        }
    }

    loadWaiting () {
        // Индикатор загрузки появляется только, если загрузка происходит дольше 100 мс
        this.timOutOfLoading = setTimeout(() => this.localElement.classList.remove('hidden'), 100);
    }

    endLoadWaiting () {
        clearTimeout(this.timOutOfLoading);
        if (!this.localElement.classList.contains('hidden')) {
            this.localElement.classList.add('hidden');
        }
    }

    loadResponse (data) {
        // При медленном интернете, View могла загрузиться, когда пользователь вернулся в меню
        if (this.isClosed) {
            return;
        }

        this._endLoadWaiting();

        super.render(null, { users: data });

        if (this.pagination !== null) {
            this.pagination.render(this.element.querySelector('.paginator'));
        }

        this.afterRender();
    }

    afterRender () {
        this.localElement = this.element.querySelector('.loading');
        const backBtn = this.element.querySelector('.back-menu-btn');
        backBtn.addEventListener('click', () => { this.isClosed = true; });
    }
}