import menuController from './controllers/menuCtrl.js';
import aboutController from './controllers/aboutCtrl.js';
import loginController from './controllers/loginCtrl.js';
import signUpController from './controllers/signUpCtrl.js';
import leaderboardController from './controllers/leaderboardCtrl.js';
import profileController from './controllers/profileCtrl.js';
import gameController from './controllers/gameCtrl.js';

import Router from './libs/router.js';

document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }

    const page = document.getElementsByClassName('body-cnt')[0];
    createPage(page);
    const main = document.getElementsByClassName('main-container')[0];
    const router = new Router(page);

    const gameCtrl = new gameController();
    const menuCntl = new menuController();
    const aboutCtrl = new aboutController();
    const loginCtrl = new loginController(router);
    const signUpCtrl = new signUpController({router});
    const leaderboardCtrl = new leaderboardController();
    const profileCtrl = new profileController({router});

    router.add('/about', main, aboutCtrl.aboutView);
    router.add('/login', main, loginCtrl.loginView);
    router.add('/profile', main, profileCtrl.profileView);
    router.add('/signup', main, signUpCtrl.signUpView);
    router.add('/leaders', main, leaderboardCtrl.leaderboardView);
    router.add('/single', main, gameCtrl.gameView);
    // router.add('/multi', main, gameCtrl.gameView);  --------->  resolve numOfPlayers
    router.add('/', main, menuCntl.menuView);

    router.start();
});

function createPage(page) {
    page.innerHTML = '<main class="main-container"></canvas></main>';
}
