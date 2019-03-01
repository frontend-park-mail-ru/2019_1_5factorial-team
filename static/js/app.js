// import 'normalize.css';
// import './css/style.css';
import menuController from './controller/menuController.js';
import Router from './libs/router.js';
// import EventBus from './libs/event/eventbus.js';
// import runtime from '/node_modules/serviceworker-webpack-plugin/lib/runtime.js';

document.addEventListener('DOMContentLoaded', () => {
  // if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
  //     runtime.register();
  // }

  console.log('start');
  const page = document.querySelector('.page');
  createSiteModules(page);
  const main = document.querySelector('.main');
  // const header = document.querySelector('header');

  const router = new Router(page);

  // const globalEventBus = new EventBus(['ld', 'clh']);

  // const headerBarController = new HeaderBarController({ globalEventBus, router });
  // headerBarController.headerBarView.render(header);

  // const aboutController = new AboutController();
  // const scoreboardController = new ScoreboardController();
  const MenuController = new menuController();
  // const signinController = new SigninController({ router, globalEventBus });
  // const signupContoller = new SignupController({ router, globalEventBus });
  // const profileControlleer = new ProfileController({ router, globalEventBus });
  // const chatController = new ChatController({ router, globalEventBus });
  // const gameController = new GameController({ router, globalEventBus });

  // router.add('/about', main, aboutController.aboutView);
  // router.add('/leaderboard', main, scoreboardController.scoreboardView);
  // router.add('/signin', main, signinController.signinView);
  // router.add('/profile', main, profileControlleer.profileView);
  // router.add('/signup', main, signupContoller.signupView);
  router.add('/', main, MenuController.menuView);
  // router.add('/multiplayer', main, gameController.multiplayerView);
  // router.add('/singleplayer', main, gameController.singleplayerView);
  // router.add('/chat', main, chatController.chatView);

  // router.setNotFoundView(main, new NotFoundView());
  router.start();
});

function createSiteModules(root) {
  root.innerHTML = '<main class="main"></main>';
}
