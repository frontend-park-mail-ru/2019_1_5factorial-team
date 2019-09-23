import '../css/reset.scss';
import '../css/style.scss';

import {menuController} from './controllers/menuCtrl';
import {aboutController} from './controllers/aboutCtrl';
import {loginController} from './controllers/loginCtrl';
import {signUpController} from './controllers/signUpCtrl';
import {leaderboardController} from './controllers/leaderboardCtrl';
import {profileController} from './controllers/profileCtrl';
import {gameController} from './controllers/gameCtrl';

import Router from './libs/router';
import Logger from './libs/logger';

document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }

    const page = document.getElementsByClassName('body-cnt')[0];
    createPage(page);
    const main = document.getElementsByClassName('main-container')[0];
    const logger = new Logger('/api/frontlogs');
    const router = new Router(page, logger);

    const gameCtrl = new gameController(logger);
    const menuCntl = new menuController(logger);
    const aboutCtrl = new aboutController(logger);
    const loginCtrl = new loginController(router, logger);
    const signUpCtrl = new signUpController(router, logger);
    const leaderboardCtrl = new leaderboardController(logger);
    const profileCtrl = new profileController(router, logger);

    router.add('/about', main, aboutCtrl.aboutView);
    router.add('/login', main, loginCtrl.loginView);
    router.add('/profile', main, profileCtrl.profileView);
    router.add('/signup', main, signUpCtrl.signUpView);
    router.add('/leaders', main, leaderboardCtrl.leaderboardView);
    router.add('/single', main, gameCtrl.gameViewSingle);
    router.add('/multi', main, gameCtrl.gameViewMulti);
    router.add('/', main, menuCntl.menuView);

    router.start();
});

function createPage(page: Element) {
    page.innerHTML = '<main class="main-container"></canvas></main>';
}
