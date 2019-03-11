import View from '../../libs/views.js';
import paginator from '../../libs/pagination.js';

export default class leaderboardView extends View {
    constructor({ eventBus = {} }) {
        super('leaderboard/leaderboardView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
        this.localEventBus.getEvent('loadResponse', this.loadResponse.bind(this));
        this.localEventBus.getEvent('loadPaginatorResponse', this.loadPaginatorResponse.bind(this));
        this.pagination = null;
        this.isClosed = false;
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
                <a class="btn users__btn_action" href="/profile">Profile</a>
                <a class="btn users__btn_action js-signout" href="/">SignOut</a>
            </div>
        </section>`;

            //profile svg
            // <svg xmlns="http://www.w3.org/2000/svg" width="0.7em" height="0.7em" viewBox="0 0 16 16">
            // <path fill-rule="evenodd" d="M1.975 10.649l6.591-6.591 3.376 3.376-4.903 4.903-1.688 1.688c-.001.001-.378.35-1.108.487l-2.522.477a.685.685 0 0 1-.56-.15.685.685 0 0 1-.15-.56l.477-2.522c.137-.729.485-1.105.487-1.108zm1.01.916a.387.387 0 0 1 .56-.014l.904.904a.386.386 0 0 1 0 .546l-.059.059s-.162.15-.476.209l-1.083.205a.295.295 0 0 1-.241-.064.295.295 0 0 1-.064-.241l.205-1.083c.059-.314.209-.476.209-.476l.045-.045zm9.761-10.272a.999.999 0 0 0-1.414 0L10 2.624 13.376 6l1.331-1.332a.999.999 0 0 0 0-1.414l-1.961-1.961z"/>
            // </svg>

            //logout svg
            // <svg xmlns="http://www.w3.org/2000/svg" width="0.7em" height="0.7em" viewBox="0 0 16 16">
            //                 <path fill-rule="evenodd" d="M16 11.489c0 1.768-1.599 2.568-1.599 2.568l-2.684 1.791-.001.001a1.164 1.164 0 0 1-1.718-1.027l.001-.155V14H7a2 2 0 0 1-2-2v-2a1 1 0 0 1 2 0v1.403c0 .329.267.597.597.597h2.402L10 9V5.692c0-1.796 1.503-2.463 1.503-2.463l2.228-1.131A.594.594 0 0 0 13.403 2H7.597A.597.597 0 0 0 7 2.597V4a1 1 0 0 1-2 0V2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v9.489zM.307 6.278l1.986-1.985a1 1 0 0 1 1.414 1.414L3.414 6H7a1 1 0 0 1 0 2H3.414l.293.293a1 1 0 0 1-1.414 1.414L.307 7.722l-.014-.015a.983.983 0 0 1-.276-.523v-.001l-.001-.001v-.005l-.001-.003v-.003l-.001-.003v-.001a.82.82 0 0 1-.012-.101v-.011l-.001-.001v-.022H0v-.063l.001-.001v-.01a.985.985 0 0 1 .292-.665l.014-.015z"/>
            //             </svg>
            console.log('auth in menu');
        }

        const signoutButton = document.querySelector('.js-signout');
        signoutButton.addEventListener('click', () => {
            this.localEventBus.callEvent('signOut');
        });
    }

    render(root, data = {}) {
        super.render(root, data);
        this.localEventBus.callEvent('loadPaginator');
        this.localEventBus.callEvent('load', { pageNum: 1 });
        this.localEventBus.callEvent('checkAuthorization');
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