// import eventBus from './libs/eventBus.js';
import menuController from './controllers/menuCtrl.js';
import aboutController from './controllers/aboutCtrl.js';
import loginController from './controllers/loginCtrl.js';
import signUpController from './controllers/signUpCtrl.js';
import Router from './libs/router.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('debug point: start work!');

    const page = document.querySelector('.body-cnt');
    createPage(page);
    const router = new Router(page);
    
    const main = document.querySelector('.main-container');
    const menuCntl = new menuController();
    const aboutCtrl = new aboutController();
    const loginCtrl = new loginController({router});
    const signUpCtrl = new signUpController({router});

    router.add('/about', main, aboutCtrl.aboutView);
    router.add('/login', main, loginCtrl.loginView);
    router.add('/signUp', main, signUpCtrl.singUpView);
    // router.add('/leaders', main, leadersCtrl.leadersView);
    // router.add('/profile', main, profileCtrl.profileView);
    router.add('/', main, menuCntl.menuView);

    router.start();
});

function createPage(page) {
    page.innerHtml = '<main class="main-container"></main>';
}