import View from '../../libs/view';
import Menu from '../../component/menu/menu';

import template from './menu.tmpl.xml';
// const template = './menu.tmpl.xml';
export default class viewMenu extends View {
  constructor({ eventBus = {} }) {
    super(template, eventBus);
    this._eventBus.subscribeToEvent('checkAuthResponse', this._onCheckAuthResponse.bind(this));
  }

  _onCheckAuthResponse({ isAuth, online = true } = {}) {
    let menu;
    const menuSection = this.el.querySelector('.menu-container');
    if (!isAuth && online) {
      menu = new Menu([
        { textLabel: 'single', href: '/single' },
        {
          textLabel: 'multi',
          href: '/signin',
          clickCallback: this._onNotAuthMultiplayerClick.bind(this),
        },
        { textLabel: 'shop', href: '/shop' },
        { textLabel: 'leaders', href: '/leaders' },
      ]);
    } else if (online === false) {
      menu = new Menu([
        { textLabel: 'single', href: '/single' },
        {
          textLabel: 'multi',
          href: '',
          clickCallback: this._onOfflineMultiplayerClick.bind(this),
        },
        {
          textLabel: 'shop',
          href: '',
          clickCallback: this._onOfflineMultiplayerClick.bind(this),
        },
        { textLabel: 'leaders', href: '/leaders' },
      ]);
    } else {
      menu = new Menu([
        { textLabel: 'single', href: '/single' },
        { textLabel: 'multi', href: '/multi' },
        { textLabel: 'shop', href: '/shop' },
        { textLabel: 'leaders', href: '/leaders' },
      ]);
    }

    menu.render(menuSection);
  }

  render(root, data = {}) {
    super.render(root, data);
    this._eventBus.triggerEvent('checkAuth');
  }

  _onOfflineMultiplayerClick() {

  }

  _onNotAuthMultiplayerClick() {

  }
}
