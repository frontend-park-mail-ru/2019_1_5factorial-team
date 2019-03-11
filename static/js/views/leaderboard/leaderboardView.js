import View from '../../libs/views.js';
import paginator from '../../libs/pagination.js';

export default class leaderboardView extends View {
    constructor({ eventBus = {} }) {
        super('leaderboard/leaderboardView.tmpl', eventBus);
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
        this.localEventBus.callEvent('checkAuthorization');
    }

    onCheckAuthResponse ({isAuthorized} = {}) {
        const rightBlock = document.querySelector('.main-right-block');
        console.log(isAuthorized);
    
        if (!isAuthorized) {
            console.log('no auth in menu');
        } else {
            rightBlock.innerHTML = `<section class="container__block container__block_side">
            <div class="users">
                <img class="users__avatar" src="img/default.jpg">
                <div class="users__title">hello</div>
                <a class="btn users__btn_action" href="/profile">profile</a>
                <a class="btn users__btn_action js-signout" href="/">SignOut</a>
            </div>
            </section>`;
            console.log('auth in menu');
        }

        const signoutButton = document.querySelector('.js-signout');
        signoutButton.addEventListener('click', () => {
            this.localEventBus.callEvent('signOut');
        });
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

        console.log('data.score ', data);
        super.render(null, { users: data });

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