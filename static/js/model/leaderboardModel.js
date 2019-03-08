import api from '../libs/api.js';

export default class leaderboardModel {
    constructor (eventBus) {
        this.localEventBus = eventBus;
        this.localEventBus.getEvent('load', this.loadPage.bind(this));
        this.localEventBus.getEvent('loadPaginator', this.loadPaginator.bind(this));

        this.countOfPages = 5;
        this.numOfPositions = 5;
    }

    loadPaginator () {
        api.getUserCount()
            .then(resp => resp.json())
            .then(users => {
                if (users.count) {
                    this.sumOfUsers = users.count;
                    this.localEventBus.callEvent('loadPaginatorResponse', {
                        pagesCount: this.sumOfUsers / this.countOfPages,
                        linksCount: this.numOfPositions
                    });
                }
            });
    }

    loadPage ({ pageNum = 1 } = {}) {
        this.localEventBus.callEvent('loadWaiting');
        api.getScore({
            limit: this.numOfPositions,
            offset: this.numOfPositions * (pageNum - 1)
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
            throw new Error('Can`t load scoreboard: ' + res.status);
        }).then(data =>
            this.localEventBus.callEvent('loadResponse', data.scores)
        ).catch(err => {
            console.error(err);
            this.localEventBus.callEvent('loadResponse', {});
        });
    }
}