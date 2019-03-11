import View from '../../libs/views.js';
import paginator from '../../libs/pagination.js';

export default class leaderboardView extends View {
    constructor({ eventBus = {} }) {
        super('leaderboard/leaderboardView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('loadResponse', this.loadResponse.bind(this));
        this.localEventBus.getEvent('loadPaginatorResponse', this.loadPaginatorResponse.bind(this));
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

            const root = document.querySelector('.paginator-block');
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

    loadResponse (data) {
        if (this.isClosed) {
            return;
        }

        super.render(null, { users: data });
        console.log('data.score ', data);

        if (this.pagination !== null) {
            this.pagination.render(document.querySelector('.paginator-block'));
        }

        this.afterRender();
    }

    afterRender () {
        const backBtn = document.querySelector('.back-menu-btn');
        backBtn.addEventListener('click', () => { this.isClosed = true; });
    }
}