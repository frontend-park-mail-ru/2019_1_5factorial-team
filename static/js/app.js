// import eventBus from './libs/eventBus.js';
import menuController from './controllers/menuCtrl.js';
import aboutController from './controllers/aboutCtrl.js';
import Router from './libs/router.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('debug point: start work!');

    const page = document.querySelector('.body-cnt');
    // const page = document.getElementsByTagName('body');
    createPage(page);
    const main = document.querySelector('.main-container');
    const menuCntl = new menuController();
    const aboutCtrl = new aboutController();

    const router = new Router(page);

    router.add('/', main, menuCntl.menuView);
    router.add('/about', main, aboutCtrl.aboutView);

    router.start();
});

function createPage(page) {
    page.innerHtml = '<main class="main-container"></main>';
}