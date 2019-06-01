import View from '../../libs/views';

import userBlock from '../../components/userBlock/userBlock';
// import ModalWindow from '../../components/modalWindow/modalWindow';

import template from './menuView.tmpl.xml';
// import Recognizer from '../../components/game/recognition';

import './menu.scss';

export default class viewMenu extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.isAuth = false;

        // this.recognizer = new Recognizer();

        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
    }

    onCheckAuthResponse({isAuthorized, statusText}) {
        this.isAuth = isAuthorized;
        this.statusText = statusText;
        const checkHeader = new userBlock();
        // const MW = new ModalWindow();
        // const singleButton = document.getElementsByClassName('js-single')[0];
        // const multiButton = document.getElementsByClassName('js-multi')[0];

        if (checkHeader.changeButtonsBool(this.isAuth)) {
            const signoutButton = document.getElementsByClassName('js-signout')[0];
            signoutButton.addEventListener('click', () => {
                this.isAuth = false;
                this.localEventBus.callEvent('signOut');
            });
        }

        // singleButton.addEventListener('click', (event) => {
        //     event.preventDefault();
        //     MW.createModal('Game training');
        // });

        // multiButton.addEventListener('click', (event) => {
        //     if (this.isAuth) {
        //         event.preventDefault();
        //         MW.createModal('Menu multi waiting for player');
        //     } else {
        //         event.preventDefault();
        //         MW.createModal('Menu multi error login');
        //     }
        // });
    }

    render(root, data = {}) {
        this.localEventBus.callEvent('checkAuthorization');
        super.render(root, data);
        console.log('called render');

        // window.addEventListener('orientationchange', () =>  {
        //     this.recognizer.gcanvas.width  = window.scrollWidth;
        //     this.recognizer.height = window.scrollHeight;
        // });
        // window.addEventListener('resize', () => {
        //     this.recognizer.gcanvas.width  = window.scrollWidth;
        //     this.recognizer.height = window.scrollHeight;
        // });
        //
        // requestAnimationFrame(this.tick);

        // this.localEventBus.callEvent('checkAuthorization');
        // return this;
    }

    // tick() {
    //     if (this.recognizer.mouseIsDown) {
    //         this.recognizer.gctx.clearRect(0, 0, this.recognizer.gcanvas.scrollWidth, this.recognizer.gcanvas.scrollHeight);
    //         this.recognizer.jager.drawPatch(this.recognizer.path, this.recognizer.gctx, this.recognizer.jager.recognise(this.recognizer.path));
    //     }
    //
    //     if (this.recognizer.mouseIsDown) {  // отрисовываем символы на втором канвасе
    //         this.recognizer.gctx.clearRect(0, 0, this.recognizer.gcanvas.scrollWidth, this.recognizer.gcanvas.scrollHeight);
    //         this.recognizer.jager.drawPatch(this.recognizer.path, this.recognizer.gctx, this.recognizer.jager.recognise(this.recognizer.path));
    //     }
    // }
}
