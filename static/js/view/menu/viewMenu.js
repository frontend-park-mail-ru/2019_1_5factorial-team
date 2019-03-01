import View from '../../libs/view.js';
import Menu from '../../component/menu/menu.js';

// import template from './menu.tmpl.js';
// const template = './menu.tmpl';
export default class viewMenu extends View {
  constructor({ eventBus = {} }) {
    super('menu.tmpl', eventBus);
    this.render(document.getElementsByClassName('main')[0]);
    // this._eventBus.subscribeToEvent('checkAuthResponse', this._onCheckAuthResponse.bind(this));
  }

  // _onCheckAuthResponse({ isAuth, online = true } = {}) {
  //   let menu;
  //   const menuSection = this.el.querySelector('.menu-container');
  //   if (!isAuth && online) {
  //     menu = new Menu([
  //       { textLabel: 'single', href: '/single' },
  //       {
  //         textLabel: 'multi',
  //         href: '/signin',
  //         clickCallback: this._onNotAuthMultiplayerClick.bind(this),
  //       },
  //       { textLabel: 'shop', href: '/shop' },
  //       { textLabel: 'leaders', href: '/leaders' },
  //     ]);
  //   } else if (online === false) {
  //     menu = new Menu([
  //       { textLabel: 'single', href: '/single' },
  //       {
  //         textLabel: 'multi',
  //         href: '',
  //         clickCallback: this._onOfflineMultiplayerClick.bind(this),
  //       },
  //       {
  //         textLabel: 'shop',
  //         href: '',
  //         clickCallback: this._onOfflineMultiplayerClick.bind(this),
  //       },
  //       { textLabel: 'leaders', href: '/leaders' },
  //     ]);
  //   } else {
  //     menu = new Menu([
  //       { textLabel: 'single', href: '/single' },
  //       { textLabel: 'multi', href: '/multi' },
  //       { textLabel: 'shop', href: '/shop' },
  //       { textLabel: 'leaders', href: '/leaders' },
  //     ]);
  //   }

  //   menu.render(menuSection);
  // }

  render(root, data = {}) {
    super.render(root, data);
    // this._eventBus.triggerEvent('checkAuth');
  }

  _onOfflineMultiplayerClick() {

  }

  _onNotAuthMultiplayerClick() {

  }
}
