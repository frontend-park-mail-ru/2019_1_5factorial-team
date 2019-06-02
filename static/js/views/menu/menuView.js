import View from '../../libs/views';

import userBlock from '../../components/userBlock/userBlock';
import ModalWindow from '../../components/modalWindow/modalWindow';

import template from './menuView.tmpl.xml';
import Recognizer from '../../components/game/recognition';

import './menu.scss';

export default class viewMenu extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.isAuth = false;
        this.isFirst = true;

        this.recognizer = new Recognizer();

        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));
        this.localEventBus.getEvent('close', this.closeAndCancel.bind(this));
    }

    closeAndCancel() {
        console.log('closed tick');
        cancelAnimationFrame(this.ticking);
    }

    onCheckAuthResponse({isAuthorized, statusText}) {
        this.isAuth = isAuthorized;
        this.statusText = statusText;
        const checkHeader = new userBlock();
        const MW = new ModalWindow();
        const multiButton = document.getElementsByClassName('js-multi')[0];

        if (checkHeader.changeButtonsBool(this.isAuth)) {
            const signoutButton = document.getElementsByClassName('js-signout')[0];
            signoutButton.addEventListener('click', () => {
                this.isAuth = false;
                this.localEventBus.callEvent('signOut');
            });
        }

        multiButton.addEventListener('click', (event) => {
            if (!this.isAuth) {
                event.stopImmediatePropagation();
                event.preventDefault();
                MW.createModal('Menu multi error login');
            }
        });

        console.log(this);
    }

    render(root, data = {}) {
        super.render(root, data);

        window.addEventListener('orientationchange', () =>  {
            this.recognizer.gcanvas.width  = window.scrollWidth;
            this.recognizer.height = window.scrollHeight;
        });
        window.addEventListener('resize', () => {
            this.recognizer.gcanvas.width  = window.scrollWidth;
            this.recognizer.height = window.scrollHeight;
        });


        if (this.isFirst) {
            this.isFirst = false;
        } else {
            setTimeout(() => {this.localEventBus.callEvent('checkAuthorization');}, 100);
        }
        // this.tick();
    }

    tick() {
        this.ticking = requestAnimationFrame(this.tick.bind(this));
        if (this.recognizer.mouseIsDown) {
            this.recognizer.gctx.clearRect(0, 0, this.recognizer.gcanvas.scrollWidth, this.recognizer.gcanvas.scrollHeight);
            this.recognizer.jager.drawPatch(this.recognizer.path, this.recognizer.gctx, this.recognizer.jager.recognise(this.recognizer.path));
        }

        if (this.recognizer.mouseIsDown) {  // отрисовываем символы на втором канвасе
            this.recognizer.gctx.clearRect(0, 0, this.recognizer.gcanvas.scrollWidth, this.recognizer.gcanvas.scrollHeight);
            this.recognizer.jager.drawPatch(this.recognizer.path, this.recognizer.gctx, this.recognizer.jager.recognise(this.recognizer.path));
        }
    }
}
