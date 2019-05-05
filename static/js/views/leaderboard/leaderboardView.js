import View from '../../libs/views.js';
import paginator from '../../components/pagination/pagination.js';
import userBlock from '../../components/userBlock/userBlock.js';
import template from './leaderboardView.tmpl.xml';

import './leaderboard.scss';

export default class leaderboardView extends View {
    constructor({ eventBus = {} }) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('loadResponse', this.loadResponse.bind(this));
        this.localEventBus.getEvent('loadPaginatorResponse', this.loadPaginatorResponse.bind(this));
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
        this.pagination = null;
        this.isClosed = false;
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('loadPaginator');
        this.localEventBus.callEvent('load', { pageNum: 1 });
    }

    onCheckAuthResponse({isAuthorized = false} = {}) {
        const checkHeader = new userBlock();
        if (checkHeader.changeButtons(isAuthorized)) {
            const signoutButton = document.getElementsByClassName('js-signout')[0];
            signoutButton.addEventListener('click', () => {
                this.localEventBus.callEvent('signOut');
            });
        }
    }

    loadPaginatorResponse(data) {
        if (data.pagesCount !== undefined && data.linksCount !== undefined) {
            const callbackOnClick = (pageNum) => {
                this.localEventBus.callEvent('load', { pageNum });
            };

            const root = document.getElementsByClassName('js-paginator-buttons')[0];
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

    loadResponse(data) {
        super.render(null, { users: data });

        if (this.pagination !== null) {
            this.pagination.render(document.getElementsByClassName('js-paginator-buttons')[0]);
        }
        this.afterRender();
    }

    afterRender() {
        const backBtn = document.getElementsByClassName('js-back-to-menu')[0];
        backBtn.addEventListener('click', () => { this.isClosed = true; });
        this.localEventBus.callEvent('checkAuthorization');
    }
}
