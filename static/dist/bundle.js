/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./static/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static/js/app.js":
/*!**************************!*\
  !*** ./static/js/app.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_menuCtrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/menuCtrl.js */ \"./static/js/controllers/menuCtrl.js\");\n/* harmony import */ var _controllers_aboutCtrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/aboutCtrl.js */ \"./static/js/controllers/aboutCtrl.js\");\n/* harmony import */ var _controllers_loginCtrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/loginCtrl.js */ \"./static/js/controllers/loginCtrl.js\");\n/* harmony import */ var _controllers_signUpCtrl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controllers/signUpCtrl.js */ \"./static/js/controllers/signUpCtrl.js\");\n/* harmony import */ var _controllers_leaderboardCtrl_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controllers/leaderboardCtrl.js */ \"./static/js/controllers/leaderboardCtrl.js\");\n/* harmony import */ var _controllers_profileCtrl_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controllers/profileCtrl.js */ \"./static/js/controllers/profileCtrl.js\");\n/* harmony import */ var _libs_router_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./libs/router.js */ \"./static/js/libs/router.js\");\n\n\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  if ('serviceWorker' in navigator) {\n    navigator.serviceWorker.register('sw.js');\n  }\n\n  const page = document.getElementsByClassName('body-cnt')[0];\n  createPage(page);\n  const main = document.getElementsByClassName('main-container')[0];\n  const router = new _libs_router_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"](page);\n  const menuCntl = new _controllers_menuCtrl_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  const aboutCtrl = new _controllers_aboutCtrl_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  const loginCtrl = new _controllers_loginCtrl_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](router);\n  const signUpCtrl = new _controllers_signUpCtrl_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n    router\n  });\n  const leaderboardCtrl = new _controllers_leaderboardCtrl_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n  const profileCtrl = new _controllers_profileCtrl_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n    router\n  });\n  router.add('/about', main, aboutCtrl.aboutView);\n  router.add('/login', main, loginCtrl.loginView);\n  router.add('/profile', main, profileCtrl.profileView);\n  router.add('/signup', main, signUpCtrl.signUpView);\n  router.add('/leaders', main, leaderboardCtrl.leaderboardView);\n  router.add('/', main, menuCntl.menuView);\n  router.start();\n});\n\nfunction createPage(page) {\n  page.innerHTML = '<main class=\"main-container\"></main>';\n}\n\n//# sourceURL=webpack:///./static/js/app.js?");

/***/ }),

/***/ "./static/js/components/constants.js":
/*!*******************************************!*\
  !*** ./static/js/components/constants.js ***!
  \*******************************************/
/*! exports provided: FIRST_POS, EVENT_LIST_ABOUT, EVENT_LIST_LEADERBOARS, EVENT_LIST_LOGIN, EVENT_LIST_MENU, EVENT_LIST_PROFILE, EVENT_LIST_SIGNUP, NETWORK_ADRESS, EMAIL_EXPRESSION, MIN_LENGTH, DEFAULT_AVATAR, AVATAR_DEFAULT, ANAUTH_RESPONSE, OK_RESPONSE, COUNT_OF_PAGES, NUM_OF_POSITIONS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FIRST_POS\", function() { return FIRST_POS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_LIST_ABOUT\", function() { return EVENT_LIST_ABOUT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_LIST_LEADERBOARS\", function() { return EVENT_LIST_LEADERBOARS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_LIST_LOGIN\", function() { return EVENT_LIST_LOGIN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_LIST_MENU\", function() { return EVENT_LIST_MENU; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_LIST_PROFILE\", function() { return EVENT_LIST_PROFILE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_LIST_SIGNUP\", function() { return EVENT_LIST_SIGNUP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NETWORK_ADRESS\", function() { return NETWORK_ADRESS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EMAIL_EXPRESSION\", function() { return EMAIL_EXPRESSION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MIN_LENGTH\", function() { return MIN_LENGTH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_AVATAR\", function() { return DEFAULT_AVATAR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AVATAR_DEFAULT\", function() { return AVATAR_DEFAULT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ANAUTH_RESPONSE\", function() { return ANAUTH_RESPONSE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OK_RESPONSE\", function() { return OK_RESPONSE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"COUNT_OF_PAGES\", function() { return COUNT_OF_PAGES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NUM_OF_POSITIONS\", function() { return NUM_OF_POSITIONS; });\nconst FIRST_POS = 1;\nconst EVENT_LIST_ABOUT = ['checkAuthorizationResponse', 'checkAuthorization', 'signOut', 'closeView'];\nconst EVENT_LIST_LEADERBOARS = ['checkAuthorizationResponse', 'checkAuthorization', 'load', 'loadResponse', 'loadPaginator', 'loadPaginatorResponse', 'checkAuthError', 'signOut', 'closeView'];\nconst EVENT_LIST_LOGIN = ['login', 'loginResponse', 'loginSuccess', 'loadWaiting'];\nconst EVENT_LIST_MENU = ['checkAuthorizationResponse', 'checkAuthorization', 'signoutResponse', 'signOut', 'closeView'];\nconst EVENT_LIST_PROFILE = ['checkAuth', 'checkAuthResponse', 'loadUser', 'loadUserResponse', 'checkAuthError', 'changeEmail', 'changeEmailResponse', 'changePassword', 'changePasswordResponse', 'changeAvatar', 'changeAvatarResponse', 'changeAvatarSuccess', 'submitEmail', 'submitEmailResponse', 'submitEmailSuccess', 'submitPassword', 'submitPasswordResponse', 'submitPasswordSuccess', 'logOutResponse', 'signOut', 'closeView'];\nconst EVENT_LIST_SIGNUP = ['signup', 'signupResponse', 'signupSuccess', 'changeEmail', 'changeEmailResponse', 'changeLogin', 'changeLoginResponse', 'changePassword', 'changePasswordResponse', 'changePasswordRepeat', 'changePasswordRepeatResponse', 'loadWaiting'];\nconst NETWORK_ADRESS = 'http://78.155.207.69:5051';\nconst EMAIL_EXPRESSION = new RegExp(/^(([^<>()\\[\\]\\.,;:\\s@\\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@(([^<>()\\.,;\\s@\\\"]+\\.{0,1})+[^<>()\\.,;:\\s@\\\"]{2,})$/);\nconst MIN_LENGTH = 4;\nconst DEFAULT_AVATAR = '';\nconst AVATAR_DEFAULT = '../../../img/default.jpg';\nconst ANAUTH_RESPONSE = 401;\nconst OK_RESPONSE = 200;\nconst COUNT_OF_PAGES = 5;\nconst NUM_OF_POSITIONS = 5;\n\n//# sourceURL=webpack:///./static/js/components/constants.js?");

/***/ }),

/***/ "./static/js/components/pagination.js":
/*!********************************************!*\
  !*** ./static/js/components/pagination.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return paginator; });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./static/js/components/constants.js\");\n\n\nconst noop = () => null;\n\nclass paginator {\n  /**\n   * Создает пагинатор\n   * @param countOfPages сколько всего страниц в пагинаторе\n   * @param numOfPositions сколько кнопок в пагинаторе\n   * @param callbackOnClick действие при клике на кнопку\n   */\n  constructor({\n    countOfPages,\n    numOfPositions,\n    callbackOnClick = noop\n  } = {}) {\n    this.localCountOfPages = countOfPages;\n    this.localNumOfPositions = numOfPositions;\n    this.localCallbackOnClick = callbackOnClick;\n    this.localLinks = [];\n    this.firstPos = _constants_js__WEBPACK_IMPORTED_MODULE_0__[\"FIRST_POS\"];\n    this.lastPos = this.localNumOfPositions < this.localCountOfPages ? this.localNumOfPositions : this.localCountOfPages; // TODO(): сделать две кнопки - First page и Last page для проброски в начало и конец\n\n    for (let i = this.firstPos - 1; i < this.lastPos; i++) {\n      const paginatorElem = document.createElement('div');\n      paginatorElem.classList.add('paginator__page');\n      this.localLinks.push(paginatorElem);\n      this.localLinks[i].addEventListener('click', this.onLinkClick.bind(this));\n      this.localLinks[i].textContent = i + 1;\n    }\n  }\n  /**\n   * Вставляет пагинатор в root элемент\n   * @param root\n   */\n\n\n  render(root) {\n    root.innerHTML = '';\n    this.localLinks.forEach(val => root.appendChild(val));\n  } // TODO(4taa): поправить ифы + намазать JSDoc\n\n  /**\n   * Отрисовка страниц с учетом того, на какой находимся\n   * @param {*} event\n   */\n\n\n  onLinkClick(event) {\n    event.preventDefault();\n    const linkStr = event.target.textContent;\n\n    if (typeof +linkStr === 'number') {\n      const linkNum = +linkStr;\n\n      if (linkNum === (this.lastPos + this.firstPos) / 2 || linkNum < (1 + this.localNumOfPositions) / 2 && this.firstPos === 1 || linkNum > (this.localCountOfPages - this.localNumOfPositions + this.localCountOfPages) / 2 && this.lastPos === this.localCountOfPages || linkNum === this.localCountOfPages) {\n        this.localChanges(this.firstPos, this.lastPos, linkNum);\n      } else if (linkNum > (this.lastPos + this.firstPos) / 2) {\n        this.localChanges(this.firstPos + 1, this.lastPos + 1, linkNum);\n      } else if (linkNum < (this.lastPos + this.firstPos) / 2) {\n        this.localChanges(this.firstPos - 1, this.lastPos - 1, linkNum);\n      }\n\n      this.localCallbackOnClick(linkNum);\n    }\n  }\n\n  localChanges(firstNum, lastNum) {\n    this.firstPos = firstNum;\n    this.lastPos = lastNum >= this.localCountOfPages ? this.localCountOfPages : lastNum;\n    this.localLinks.forEach(val => val.textContent = firstNum++);\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/components/pagination.js?");

/***/ }),

/***/ "./static/js/components/userBlock.js":
/*!*******************************************!*\
  !*** ./static/js/components/userBlock.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return userBlock; });\n\n\nclass userBlock {\n  changeButtons(isAuth = false) {\n    const userButtons = document.getElementsByClassName('js-check-auth')[0];\n\n    if (isAuth) {\n      userButtons.innerHTML = `<a class=\"btn users__btn_action\" href=\"/profile\">Profile</a>\n            <a class=\"btn users__btn_action js-signout\" href=\"/\">Sign Out</a>`;\n      return true;\n    } else {\n      userButtons.innerHTML = `<a class=\"btn users__btn login-btn\" href=\"/login\">Log In</a>\n            <a class=\"btn users__btn signup-btn\" href=\"/signup\">Sign Up</a>`;\n      return false;\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/components/userBlock.js?");

/***/ }),

/***/ "./static/js/controllers/aboutCtrl.js":
/*!********************************************!*\
  !*** ./static/js/controllers/aboutCtrl.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return aboutController; });\n/* harmony import */ var _views_about_aboutView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/about/aboutView.js */ \"./static/js/views/about/aboutView.js\");\n/* harmony import */ var _model_aboutModel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/aboutModel.js */ \"./static/js/model/aboutModel.js\");\n/* harmony import */ var _libs_eventBus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../libs/eventBus.js */ \"./static/js/libs/eventBus.js\");\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\n\n\n\nconst eventList = _components_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"EVENT_LIST_ABOUT\"];\nclass aboutController {\n  constructor() {\n    const eventBus = new _libs_eventBus_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](eventList);\n    this.aboutView = new _views_about_aboutView_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      eventBus\n    });\n    this.aboutModel = new _model_aboutModel_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](eventBus);\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/controllers/aboutCtrl.js?");

/***/ }),

/***/ "./static/js/controllers/leaderboardCtrl.js":
/*!**************************************************!*\
  !*** ./static/js/controllers/leaderboardCtrl.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return leaderboardController; });\n/* harmony import */ var _views_leaderboard_leaderboardView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/leaderboard/leaderboardView.js */ \"./static/js/views/leaderboard/leaderboardView.js\");\n/* harmony import */ var _model_leaderboardModel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/leaderboardModel.js */ \"./static/js/model/leaderboardModel.js\");\n/* harmony import */ var _libs_eventBus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../libs/eventBus.js */ \"./static/js/libs/eventBus.js\");\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\n\n\n\nconst eventList = _components_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"EVENT_LIST_LEADERBOARS\"];\nclass leaderboardController {\n  constructor() {\n    const eventBus = new _libs_eventBus_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](eventList);\n    this.leaderboardView = new _views_leaderboard_leaderboardView_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      eventBus\n    });\n    this.leaderboardModel = new _model_leaderboardModel_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](eventBus);\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/controllers/leaderboardCtrl.js?");

/***/ }),

/***/ "./static/js/controllers/loginCtrl.js":
/*!********************************************!*\
  !*** ./static/js/controllers/loginCtrl.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return loginController; });\n/* harmony import */ var _views_login_loginView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/login/loginView.js */ \"./static/js/views/login/loginView.js\");\n/* harmony import */ var _model_loginModel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/loginModel.js */ \"./static/js/model/loginModel.js\");\n/* harmony import */ var _libs_eventBus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../libs/eventBus.js */ \"./static/js/libs/eventBus.js\");\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\n\n\n\nconst eventList = _components_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"EVENT_LIST_LOGIN\"];\nclass loginController {\n  constructor(router) {\n    const eventBus = new _libs_eventBus_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](eventList);\n    eventBus.getEvent('loginSuccess', () => {\n      router.toStartPage();\n    });\n    this.loginView = new _views_login_loginView_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      eventBus\n    });\n    this.loginModel = new _model_loginModel_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](eventBus);\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/controllers/loginCtrl.js?");

/***/ }),

/***/ "./static/js/controllers/menuCtrl.js":
/*!*******************************************!*\
  !*** ./static/js/controllers/menuCtrl.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return menuController; });\n/* harmony import */ var _model_menuModel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/menuModel.js */ \"./static/js/model/menuModel.js\");\n/* harmony import */ var _views_menu_menuView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/menu/menuView.js */ \"./static/js/views/menu/menuView.js\");\n/* harmony import */ var _libs_eventBus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../libs/eventBus.js */ \"./static/js/libs/eventBus.js\");\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\n\n\n\nconst eventList = _components_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"EVENT_LIST_MENU\"];\nclass menuController {\n  constructor() {\n    const eventBus = new _libs_eventBus_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](eventList);\n    this.menuView = new _views_menu_menuView_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      eventBus\n    });\n    this.menuModel = new _model_menuModel_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](eventBus);\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/controllers/menuCtrl.js?");

/***/ }),

/***/ "./static/js/controllers/profileCtrl.js":
/*!**********************************************!*\
  !*** ./static/js/controllers/profileCtrl.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ProfileController; });\n/* harmony import */ var _views_profile_profileView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/profile/profileView.js */ \"./static/js/views/profile/profileView.js\");\n/* harmony import */ var _model_profileModel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/profileModel.js */ \"./static/js/model/profileModel.js\");\n/* harmony import */ var _libs_eventBus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../libs/eventBus.js */ \"./static/js/libs/eventBus.js\");\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\n\n\n\nconst eventList = _components_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"EVENT_LIST_PROFILE\"];\nclass ProfileController {\n  constructor({\n    router\n  } = {}) {\n    const eventBus = new _libs_eventBus_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](eventList);\n    eventBus.getEvent('checkAuthError', () => {\n      router.toStartPage();\n    });\n    this.profileView = new _views_profile_profileView_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      eventBus\n    });\n    this.profileModel = new _model_profileModel_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](eventBus);\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/controllers/profileCtrl.js?");

/***/ }),

/***/ "./static/js/controllers/signUpCtrl.js":
/*!*********************************************!*\
  !*** ./static/js/controllers/signUpCtrl.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return signUpController; });\n/* harmony import */ var _views_signUp_signUpView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/signUp/signUpView.js */ \"./static/js/views/signUp/signUpView.js\");\n/* harmony import */ var _model_signUpModel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/signUpModel.js */ \"./static/js/model/signUpModel.js\");\n/* harmony import */ var _libs_eventBus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../libs/eventBus.js */ \"./static/js/libs/eventBus.js\");\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\n\n\n\nconst eventList = _components_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"EVENT_LIST_SIGNUP\"];\nclass signUpController {\n  constructor({\n    router\n  } = {}) {\n    const eventBus = new _libs_eventBus_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](eventList);\n    eventBus.getEvent('signupSuccess', () => {\n      router.toStartPage();\n    });\n    this.signUpView = new _views_signUp_signUpView_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      eventBus\n    });\n    this.signupModel = new _model_signUpModel_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](eventBus);\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/controllers/signUpCtrl.js?");

/***/ }),

/***/ "./static/js/libs/api.js":
/*!*******************************!*\
  !*** ./static/js/libs/api.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return api; });\n/* harmony import */ var _network_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./network.js */ \"./static/js/libs/network.js\");\n\nclass api {\n  /**\n   * Загрузка пользователя\n   * @param {*} user\n   */\n  static loadUser() {\n    return _network_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].doGet({\n      url: '/api/user'\n    }).then(res => res.json());\n  }\n  /**\n   * Проверка сессии пользователя\n   */\n\n\n  static sessionCheck() {\n    return _network_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].doGet({\n      url: '/api/session'\n    });\n  }\n  /**\n   * Удаление сессии для логаута\n   */\n\n\n  static deleteSession() {\n    _network_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].doDelete({\n      url: '/api/session'\n    }).then(response => {\n      if (!response.ok) {\n        throw new Error(`fetch out (url: ${response.url}, status: ${response.status})`);\n      }\n    }).catch(error => console.error(error));\n  }\n  /**\n   * Авторизация пользователя\n   * @param {*} loginOrEmail\n   * @param {*} password\n   */\n\n\n  static login({\n    loginOrEmail,\n    password\n  } = {}) {\n    return _network_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].doPost({\n      url: '/api/session',\n      body: {\n        'loginOrEmail': loginOrEmail,\n        password\n      }\n    });\n  }\n  /**\n   * Регистрация пользователя\n   * @param {*} login\n   * @param {*} email\n   * @param {*} password\n   */\n\n\n  static signUp({\n    login,\n    email,\n    password\n  }) {\n    return _network_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].doPost({\n      url: '/api/user',\n      body: {\n        email,\n        login,\n        password\n      }\n    });\n  }\n  /**\n   * Счетчик пользователей для лидерборда\n   */\n\n\n  static getUserCount() {\n    return _network_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].doGet({\n      url: '/api/user/count'\n    });\n  }\n  /**\n   * Обновление данных пользователя\n   * @param {*} old_password\n   * @param {*} new_password\n   * @param {*} avatar_input\n   */\n\n\n  static updateUser({\n    old_password,\n    new_password,\n    avatar_input\n  } = {}) {\n    return _network_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].doPut({\n      url: '/api/user',\n      body: {\n        'avatar': avatar_input,\n        'new_password': new_password,\n        'old_password': old_password\n      }\n    });\n  }\n  /**\n   * Загрузка нового аватара на бэк\n   * @param {*} avatar\n   */\n\n\n  static uploadAvatar(avatar) {\n    const formData = new FormData();\n    formData.append('upload', avatar);\n    return _network_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].doPostFormData({\n      url: '/api/upload_avatar',\n      body: formData\n    });\n  }\n  /**\n   * Получение рекордов пользователей\n   * @param {*} limit\n   * @param {*} offset\n   */\n\n\n  static getScore({\n    limit = 5,\n    offset = 0\n  } = {}) {\n    return _network_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].doGet({\n      url: `/api/user/score?limit=${limit}&offset=${offset}`\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/libs/api.js?");

/***/ }),

/***/ "./static/js/libs/eventBus.js":
/*!************************************!*\
  !*** ./static/js/libs/eventBus.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EventBus; });\nclass EventBus {\n  constructor(events) {\n    this.list = new Map();\n    events.forEach(name => {\n      this.list.set(name, []);\n    });\n  }\n  /**\n   * Ждем события с определенным именем\n   * @param {*} name Имя нашего события\n   * @param {*} callback Функция, которую выполняем при вызове\n   */\n\n\n  getEvent(name, callback) {\n    if (!this.list.has(name)) {\n      console.log(`Unknown event ${name}`);\n    }\n\n    this.list.get(name).push(callback);\n  }\n  /**\n   * Отвечаем на event callback'ами\n   * @param {*} name Имя нашего события\n   * @param  {...any} args \n   */\n\n\n  callEvent(name, ...args) {\n    if (!this.list.has(name)) {\n      console.log(`Unknown event ${name}`);\n    }\n\n    const listener = this.list.get(name);\n    listener.forEach(callback => {\n      callback(...args);\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/libs/eventBus.js?");

/***/ }),

/***/ "./static/js/libs/network.js":
/*!***********************************!*\
  !*** ./static/js/libs/network.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Network; });\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\nclass Network {\n  /**\n  * Пост запрос, с JSON body\n  * @param url\n  * @param body\n  * @param host\n  * @returns {Promise<Response>}\n  */\n  static doPost({\n    url = '/',\n    body = {},\n    host = Network.getServerURL()\n  } = {}) {\n    return fetch(host + url, {\n      method: 'POST',\n      body: JSON.stringify(body),\n      credentials: 'include',\n      mode: 'cors',\n      headers: {\n        'Content-Type': 'application/json; charset=utf-8'\n      }\n    });\n  }\n  /**\n  * Get запрос\n  * @param url\n  * @returns {Promise<Response>}\n  */\n\n\n  static doGet({\n    url = '/'\n  } = {}) {\n    return fetch(Network.getServerURL() + url, {\n      method: 'GET',\n      credentials: 'include'\n    });\n  }\n  /**\n  * Delete запрос\n  * @param url\n  * @param body\n  * @returns {Promise<Response>}\n  */\n\n\n  static doDelete({\n    url = '/'\n  } = {}) {\n    return fetch(Network.getServerURL() + url, {\n      method: 'DELETE',\n      credentials: 'include'\n    });\n  }\n  /**\n   * Get на урл сервера\n   */\n\n\n  static getServerURL() {\n    return _components_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"NETWORK_ADRESS\"];\n  }\n  /**\n  * Put запрос, с JSON body\n  * @param url\n  * @param body\n  * @returns {Promise<Response>}\n  */\n\n\n  static doPut({\n    url = '/',\n    body = {}\n  } = {}) {\n    return fetch(Network.getServerURL() + url, {\n      method: 'PUT',\n      body: JSON.stringify(body),\n      credentials: 'include',\n      mode: 'cors',\n      headers: {\n        'Content-Type': 'application/json; charset=utf-8'\n      }\n    });\n  }\n  /**\n  * Post запрос с multipart form data. Fetch сам выставляет необходимые заголовки\n  * @param url\n  * @param body\n  * @returns {Promise<Response>}\n  */\n\n\n  static doPostFormData({\n    url = '/',\n    body = {}\n  } = {}) {\n    return fetch(Network.getServerURL() + url, {\n      method: 'POST',\n      body,\n      mode: 'cors',\n      credentials: 'include'\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/libs/network.js?");

/***/ }),

/***/ "./static/js/libs/router.js":
/*!**********************************!*\
  !*** ./static/js/libs/router.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Router; });\nclass Router {\n  constructor(root) {\n    this.root = root;\n    this.routes = new Map();\n    this.currentRoute = null;\n    this.isCurrentNotFound = false;\n    window.addEventListener('popstate', () => {\n      const pathname = Router.normalizePath(location.pathname);\n      this.change(pathname, false);\n    });\n  }\n  /**\n   * Переходит на начальную страницу с путем '/'\n   * @param delPrev удаляет из истории Путь из которого сделан переход\n   */\n\n\n  toStartPage(delPrev = false) {\n    if (delPrev) {\n      window.history.replaceState(null, null, '/');\n    }\n\n    this.change('/', !delPrev);\n  }\n  /**\n   * Добавляет маршрут для роутера.\n   * @param path путь при переходе на который будет вызвана view\n   * @param root элемент куда будет рисоваться view, по-умолчание это this.root\n   * @param view компонент, который отрисуется\n   * @param data router data\n   */\n\n\n  add(path, root = this.root, view, data) {\n    this.routes.set(path, {\n      root,\n      view,\n      data\n    });\n  }\n  /**\n   * Устанавливает View компонент, который будет отрисовываться, если не найден запрашиваемый маршрут\n   * @param root элемент куда будет рисоваться view, по-умолчание это this.root\n   * @param view компонент, который отрисуется\n   */\n\n\n  setNotFoundView(root = this.root, view) {\n    this.notFoundView = view;\n    this.notFoundViewRoot = root;\n  }\n  /**\n   * Переход на маршрут с путем path\n   * @param path путь\n   * @param addToHistory добавлять Path в History Api или нет.\n   * @private\n   */\n\n\n  change(path, addToHistory = true) {\n    if (this.currentRoute === path) {\n      return;\n    }\n\n    const currentData = this.routes.get(this.currentRoute);\n\n    if (currentData) {\n      currentData.view.close();\n      currentData.view.hide(currentData.root);\n    }\n\n    if (this.isCurrentNotFound) {\n      this.notFoundView.close();\n      this.notFoundView.hide(this.notFoundViewRoot);\n    }\n\n    if (addToHistory) {\n      window.history.pushState(null, null, path);\n    }\n\n    if (this.routes.has(path)) {\n      let route = this.routes.get(path);\n      route.view.render(route.data);\n      this.currentRoute = path;\n    } else {\n      this.notFoundView.render(this.notFoundViewRoot);\n      this.currentRoute = null;\n      this.isCurrentNotFound = true;\n    }\n  }\n  /**\n   * Удаляет суффикс '/', если path != '/'\n   * @param path\n   * @returns {string}\n   * @private\n   */\n\n\n  static normalizePath(path) {\n    return path.charAt(path.length - 1) === '/' && path !== '/' ? path.slice(0, path.length - 1) : path;\n  }\n  /**\n   * Запускает роутер\n   */\n\n\n  start() {\n    this.root.addEventListener('click', event => {\n      if (event.target.tagName === 'A' && event.target.hostname === location.hostname) {\n        event.preventDefault();\n        this.change(Router.normalizePath(event.target.pathname));\n      }\n    });\n    this.change(Router.normalizePath(window.location.pathname), false);\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/libs/router.js?");

/***/ }),

/***/ "./static/js/libs/users.js":
/*!*********************************!*\
  !*** ./static/js/libs/users.js ***!
  \*********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"User\", function() { return User; });\nclass UserSingleton {\n  constructor() {\n    this.login = null;\n    this.email = null;\n    this.score = null;\n    this.avatar = null;\n    this.guid = null;\n  }\n  /**\n   * Устанавливает значения для юзера, можно тригерить 'setUser' -ом глобального EventBus\n   * @param email\n   * @param score\n   * @param avatar\n   * @param guid\n   * @param login\n   */\n\n\n  setUser({\n    email,\n    score,\n    avatar,\n    guid,\n    login\n  } = {}) {\n    this.email = email;\n    this.score = score;\n    this.avatar = avatar || 'images/default-avatar.svg';\n    this.guid = guid;\n    this.login = login || 'Nouserlogin';\n  }\n  /**\n   * Удаляет данные пользователя\n   */\n\n\n  removeUser() {\n    this.email = null;\n    this.score = null;\n    this.avatar = null;\n    this.guid = null;\n    this.login = null;\n  }\n\n}\n\nlet User = new UserSingleton();\n\n//# sourceURL=webpack:///./static/js/libs/users.js?");

/***/ }),

/***/ "./static/js/libs/validation.js":
/*!**************************************!*\
  !*** ./static/js/libs/validation.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Validator; });\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\nclass Validator {\n  /**\n   * validateEmail - check validity of input email (using RegExp)\n   * @param {string} email\n   * @return {boolean}\n   */\n  static validateEmail(email) {\n    return _components_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"EMAIL_EXPRESSION\"].test(email);\n  }\n  /**\n   * validateLogin - check validity of input login (only for length)\n   * @param {string} data\n   * @return {boolean}\n   */\n\n\n  static validateLogin(data) {\n    return data.length >= _components_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"MIN_LENGTH\"];\n  }\n  /**\n   * validateLogin - check validity of input login or email (only for length)\n   * @param {string} data\n   * @return {boolean}\n   */\n\n\n  static validateLoginOrEmail(data) {\n    const loginInput = Validator.validateLogin(data);\n    const emailInput = Validator.validateEmail(data);\n    return loginInput || emailInput;\n  }\n  /**\n   * validatePassword - check validity of input password (only for length)\n   * @param {string} data\n   * @return {boolean}\n   */\n\n\n  static validatePassword(data) {\n    return data.length >= _components_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"MIN_LENGTH\"];\n  }\n  /**\n   * validateImage - check validity of input image\n   * @param {HTMLElement} myInput\n   * @return {boolean}\n   */\n\n\n  static validateImage(myInput) {\n    return myInput.type !== 'image/jpeg' || myInput.type !== 'image/png';\n  }\n  /**\n   * validateRepeatPasswords - check validity of input passwords and compare them\n   * @param first\n   * @param second\n   * @return {boolean}\n   */\n\n\n  static validateRepeatPasswords(first, second) {\n    return first.value === second.value;\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/libs/validation.js?");

/***/ }),

/***/ "./static/js/libs/views.js":
/*!*********************************!*\
  !*** ./static/js/libs/views.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return View; });\nclass View {\n  constructor(tmpl, eventBus) {\n    this.tmpl = tmpl;\n    this.localEventBus = eventBus;\n    this.prevRoot = null;\n    this.closedView = false;\n    this.fest = window.fest[tmpl];\n  }\n  /**\n     * Функция рендера с сохранением предыдущей страницы в prevRoot\n     * @param root, если null, то рендерится this.prevRoot\n     * @param data\n     * @returns {View}\n     */\n\n\n  render(root, data) {\n    this.closedView = false;\n\n    if (root === undefined || root === null) {\n      root = this.prevRoot;\n    } else {\n      this.prevRoot = root;\n    } // this.element.innerHTML = this.tmpl(data);\n\n\n    root.innerHTML = this.fest(data);\n    return this;\n  }\n  /**\n   * Закрываем вьюшку по вызову события\n   */\n\n\n  close() {\n    this.closedView = true;\n\n    try {\n      this.localEventBus.callEvent('close');\n    } catch (e) {\n      console.log('no such event - close');\n    }\n  }\n\n  hide(root) {\n    root.innerHTML = '';\n    return this;\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/libs/views.js?");

/***/ }),

/***/ "./static/js/model/aboutModel.js":
/*!***************************************!*\
  !*** ./static/js/model/aboutModel.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return aboutModel; });\n/* harmony import */ var _libs_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/api.js */ \"./static/js/libs/api.js\");\n/* harmony import */ var _libs_network_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/network.js */ \"./static/js/libs/network.js\");\n/* harmony import */ var _libs_users_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../libs/users.js */ \"./static/js/libs/users.js\");\n/* harmony import */ var _components_userBlock_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/userBlock.js */ \"./static/js/components/userBlock.js\");\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\n\n\n\n\nclass aboutModel {\n  constructor(eventBus) {\n    this.localEventBus = eventBus;\n    this.localEventBus.getEvent('checkAuthorization', this.checkAuthorization.bind(this));\n    this.localEventBus.getEvent('signOut', this.onLogout.bind(this));\n  }\n  /**\n   * Проверяем пользователя - авторизован ли\n   */\n\n\n  checkAuthorization() {\n    const res = _libs_network_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].doGet({\n      url: '/api/session'\n    });\n    res.then(res => {\n      if (res.status === _components_constants_js__WEBPACK_IMPORTED_MODULE_4__[\"ANAUTH_RESPONSE\"]) {\n        this.localEventBus.callEvent('checkAuthorizationResponse', {\n          isAuthorized: false,\n          error: res.error\n        });\n      } else {\n        this.localEventBus.callEvent('checkAuthorizationResponse', {\n          isAuthorized: true\n        });\n      }\n    });\n  }\n  /**\n   * Заканчиваем сессию пользователя\n   */\n\n\n  onLogout() {\n    _libs_api_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteSession();\n    const isAuthorized = false;\n    const checkHeader = new _components_userBlock_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n    checkHeader.changeButtons(isAuthorized);\n    this.localEventBus.callEvent('closeView', {\n      isAuth: false,\n      signout: true\n    });\n    _libs_users_js__WEBPACK_IMPORTED_MODULE_2__[\"User\"].removeUser();\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/model/aboutModel.js?");

/***/ }),

/***/ "./static/js/model/leaderboardModel.js":
/*!*********************************************!*\
  !*** ./static/js/model/leaderboardModel.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return leaderboardModel; });\n/* harmony import */ var _libs_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/api.js */ \"./static/js/libs/api.js\");\n/* harmony import */ var _libs_network_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/network.js */ \"./static/js/libs/network.js\");\n/* harmony import */ var _libs_users_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../libs/users.js */ \"./static/js/libs/users.js\");\n/* harmony import */ var _components_userBlock_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/userBlock.js */ \"./static/js/components/userBlock.js\");\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\n\n\n\n\nclass leaderboardModel {\n  constructor(eventBus) {\n    this.localEventBus = eventBus;\n    this.localEventBus.getEvent('load', this.loadPage.bind(this));\n    this.localEventBus.getEvent('loadPaginator', this.loadPaginator.bind(this));\n    this.localEventBus.getEvent('checkAuthorization', this.checkAuthorization.bind(this));\n    this.localEventBus.getEvent('signOut', this.onLogout.bind(this));\n    this.countOfPages = _components_constants_js__WEBPACK_IMPORTED_MODULE_4__[\"COUNT_OF_PAGES\"];\n    this.numOfPositions = _components_constants_js__WEBPACK_IMPORTED_MODULE_4__[\"NUM_OF_POSITIONS\"];\n  }\n  /**\n   * Проверяем пользователя - авторизован ли\n   */\n\n\n  checkAuthorization() {\n    const res = _libs_network_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].doGet({\n      url: '/api/session'\n    });\n    res.then(res => {\n      if (res.status === _components_constants_js__WEBPACK_IMPORTED_MODULE_4__[\"ANAUTH_RESPONSE\"]) {\n        this.localEventBus.callEvent('checkAuthorizationResponse', {\n          isAuthorized: false,\n          error: res.error\n        });\n      } else {\n        this.localEventBus.callEvent('checkAuthorizationResponse', {\n          isAuthorized: true\n        });\n      }\n    });\n  }\n  /**\n   * Заканчиваем сессию пользователя\n   */\n\n\n  onLogout() {\n    _libs_api_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteSession();\n    const isAuthorized = false;\n    const checkHeader = new _components_userBlock_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n    checkHeader.changeButtons(isAuthorized);\n    this.localEventBus.callEvent('closeView', {\n      isAuth: false,\n      signout: true\n    });\n    _libs_users_js__WEBPACK_IMPORTED_MODULE_2__[\"User\"].removeUser();\n  }\n  /**\n   * Подгружаем пагинацию\n   */\n\n\n  loadPaginator() {\n    _libs_api_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getUserCount().then(resp => resp.json()).then(users => {\n      if (users.count) {\n        this.sumOfUsers = users.count;\n        this.localEventBus.callEvent('loadPaginatorResponse', {\n          pagesCount: this.sumOfUsers / this.countOfPages,\n          linksCount: this.numOfPositions\n        });\n      }\n    });\n  }\n  /**\n   * Загружаем страницы, которые необходимо пагинировать\n   */\n\n\n  loadPage({\n    pageNum = 1\n  } = {}) {\n    _libs_api_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getScore({\n      limit: this.numOfPositions,\n      offset: pageNum\n    }).then(res => {\n      if (res.status === _components_constants_js__WEBPACK_IMPORTED_MODULE_4__[\"OK_RESPONSE\"]) {\n        return res.json();\n      }\n\n      throw new Error('Can`t load scoreboard: ' + res.status);\n    }).then(data => {\n      this.localEventBus.callEvent('loadResponse', data.scores);\n    }).catch(err => {\n      console.error(err);\n      this.localEventBus.callEvent('loadResponse', {});\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/model/leaderboardModel.js?");

/***/ }),

/***/ "./static/js/model/loginModel.js":
/*!***************************************!*\
  !*** ./static/js/model/loginModel.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return loginModel; });\n/* harmony import */ var _libs_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/api.js */ \"./static/js/libs/api.js\");\n/* harmony import */ var _libs_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/validation.js */ \"./static/js/libs/validation.js\");\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\n\n\nclass loginModel {\n  constructor(eventBus) {\n    this.localEventBus = eventBus;\n    this.localEventBus.getEvent('login', this.onLogin.bind(this));\n  }\n  /**\n   * Проверяем данные на логин\n   * @param {*} data\n   */\n\n\n  onLogin(data) {\n    const loginOrEmailData = data.loginOrEmail;\n    const password = data.pass;\n    const validateLoginOrEmail = _libs_validation_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].validateLoginOrEmail(loginOrEmailData);\n\n    if (!validateLoginOrEmail) {\n      const response = {\n        inputField: 'loginOrEmail',\n        error: validateLoginOrEmail\n      };\n      this.localEventBus.callEvent('loginResponse', response);\n      return;\n    }\n\n    const validatePassword = _libs_validation_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].validatePassword(password);\n\n    if (!validatePassword) {\n      const response = {\n        inputField: 'inputPassword',\n        error: validatePassword\n      };\n      this.localEventBus.callEvent('loginResponse', response);\n      return;\n    }\n\n    this.localEventBus.callEvent('loadWaiting');\n    _libs_api_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].login({\n      loginOrEmail: loginOrEmailData,\n      password: data.pass\n    }).then(res => {\n      if (res.status === _components_constants_js__WEBPACK_IMPORTED_MODULE_2__[\"OK_RESPONSE\"]) {\n        res.json().then(data => this.localEventBus.callEvent('loginSuccess', data));\n      } else {\n        res.json().then(data => this.localEventBus.callEvent('loginResponse', data));\n      }\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/model/loginModel.js?");

/***/ }),

/***/ "./static/js/model/menuModel.js":
/*!**************************************!*\
  !*** ./static/js/model/menuModel.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return menuModel; });\n/* harmony import */ var _libs_network_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/network.js */ \"./static/js/libs/network.js\");\n/* harmony import */ var _libs_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/api.js */ \"./static/js/libs/api.js\");\n/* harmony import */ var _libs_users_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../libs/users.js */ \"./static/js/libs/users.js\");\n/* harmony import */ var _components_userBlock_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/userBlock.js */ \"./static/js/components/userBlock.js\");\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\n\n\n\n\nclass menuModel {\n  constructor(events) {\n    this.localEventBus = events;\n    this.localEventBus.getEvent('checkAuthorization', this.checkAuthorization.bind(this));\n    this.localEventBus.getEvent('signOut', this.onLogout.bind(this));\n  }\n  /**\n   * Заканчиваем сессию пользователя\n   */\n\n\n  onLogout() {\n    _libs_api_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].deleteSession();\n    const isAuthorized = false;\n    this.localEventBus.callEvent('closeView', {\n      isAuth: isAuthorized,\n      signout: true\n    });\n    const checkHeader = new _components_userBlock_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n    checkHeader.changeButtons(isAuthorized);\n    _libs_users_js__WEBPACK_IMPORTED_MODULE_2__[\"User\"].removeUser();\n  }\n  /**\n   * Проверяем пользователя - авторизован ли\n   */\n\n\n  checkAuthorization() {\n    const res = _libs_network_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].doGet({\n      url: '/api/session'\n    });\n    res.then(res => {\n      if (res.status === _components_constants_js__WEBPACK_IMPORTED_MODULE_4__[\"ANAUTH_RESPONSE\"]) {\n        this.localEventBus.callEvent('checkAuthorizationResponse', {\n          isAuthorized: false,\n          error: res.error\n        });\n      } else {\n        this.localEventBus.callEvent('checkAuthorizationResponse', {\n          isAuthorized: true\n        });\n      }\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/model/menuModel.js?");

/***/ }),

/***/ "./static/js/model/profileModel.js":
/*!*****************************************!*\
  !*** ./static/js/model/profileModel.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return profileModel; });\n/* harmony import */ var _libs_validation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/validation.js */ \"./static/js/libs/validation.js\");\n/* harmony import */ var _libs_network_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/network.js */ \"./static/js/libs/network.js\");\n/* harmony import */ var _libs_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../libs/api.js */ \"./static/js/libs/api.js\");\n/* harmony import */ var _libs_users_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../libs/users.js */ \"./static/js/libs/users.js\");\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\n\n\n\n\nclass profileModel {\n  constructor(eventBus) {\n    this.localEventBus = eventBus;\n    this.localEventBus.getEvent('changePassword', this.onChangePassword.bind(this));\n    this.localEventBus.getEvent('changeAvatar', this.onChangeAvatar.bind(this));\n    this.localEventBus.getEvent('submitPassword', this.onSubmitPassword.bind(this));\n    this.localEventBus.getEvent('checkAuth', this.onCheckAuth.bind(this));\n    this.localEventBus.getEvent('loadUser', this.onLoadUser.bind(this));\n    this.localEventBus.getEvent('signOut', this.onLogout.bind(this));\n  }\n  /**\n   * Проверяем смену аватара\n   */\n\n\n  onChangeAvatar(data) {\n    const newAvatar = data.avatar;\n    _libs_api_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].uploadAvatar(newAvatar).then(res => res.json().then(res => {\n      if (res === _components_constants_js__WEBPACK_IMPORTED_MODULE_4__[\"DEFAULT_AVATAR\"]) {\n        console.log(res); // TODO() : редирект на дефолтную аватарку\n\n        return;\n      } else {\n        const avatarName = res.avatar_link;\n        _libs_api_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].updateUser({\n          avatar_input: avatarName,\n          old_password: undefined,\n          new_password: undefined\n        }).then(res => {\n          if (res.ok) {\n            const avatarLink = _components_constants_js__WEBPACK_IMPORTED_MODULE_4__[\"NETWORK_ADRESS\"] + avatarName;\n            this.localEventBus.callEvent('changeAvatarSuccess', {\n              avatar: avatarLink\n            });\n          } else {\n            res.json().then(dataResponse => {\n              if (dataResponse.field === 'avatar') {\n                this.localEventBus.callEvent('changeAvatarResponse', {\n                  error: dataResponse.error\n                });\n              }\n            });\n          }\n        });\n      }\n    }));\n  }\n  /**\n   * Заканчиваем сессию пользователя\n   */\n\n\n  onLogout() {\n    _libs_api_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].deleteSession();\n    this.localEventBus.callEvent('closeView', {\n      isAuth: false,\n      signout: true\n    });\n    _libs_users_js__WEBPACK_IMPORTED_MODULE_3__[\"User\"].removeUser();\n  }\n  /**\n   * Вызываем смену пароля пользователя\n   * @param {*} data\n   */\n\n\n  onSubmitPassword(data) {\n    const passOld = data.oldPassword;\n    const passNew = data.newPassword;\n    const errPassOld = _libs_validation_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].validatePassword(passOld);\n\n    if (!errPassOld) {\n      this.localEventBus.callEvent('changePasswordResponse', {\n        error: errPassOld\n      });\n      return;\n    }\n\n    const errPassNew = _libs_validation_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].validatePassword(passNew);\n\n    if (!errPassNew) {\n      this.localEventBus.callEvent('changePasswordResponse', {\n        error: errPassNew\n      });\n      return;\n    }\n\n    _libs_api_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].updateUser({\n      guid: this._currentUserGUID,\n      avatar: this.avatar,\n      old_password: passOld,\n      new_password: passNew\n    }).then(res => {\n      if (res.ok) {\n        this.localEventBus.callEvent('submitPasswordSuccess', {\n          isOk: true\n        });\n      } else {\n        res.json().then(dataResponse => {\n          if (dataResponse.field === 'password') {\n            this.localEventBus.callEvent('changePasswordResponse', {\n              error: dataResponse.error\n            });\n          }\n        });\n      }\n    });\n  }\n  /**\n   * Вызываем смену пароля пользователя\n   * @param {*} data\n   */\n\n\n  onChangePassword(data) {\n    const pass = data.pass;\n    const errPass = _libs_validation_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].validatePassword(pass);\n\n    if (errPass) {\n      this.localEventBus.callEvent('changePasswordResponse', {\n        error: errPass\n      });\n      return;\n    } // TODO: update page on success change avatar\n\n\n    this.localEventBus.callEvent('changePasswordResponse', {});\n  }\n  /**\n   * Загружаем данные пользователя с сервера\n   * @param {*} data\n   */\n\n\n  onLoadUser() {\n    _libs_api_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].loadUser().then(user => {\n      if (user.error) {\n        this.localEventBus.callEvent('loadUserResponse', {});\n      } else {\n        const toSetUser = {\n          avatar: user.avatar_link,\n          score: user.score || 0,\n          login: user.nickname || 'Nouserlogin',\n          email: user.email,\n          guid: user.guid\n        };\n        _libs_users_js__WEBPACK_IMPORTED_MODULE_3__[\"User\"].setUser({\n          toSetUser\n        });\n        this.localEventBus.callEvent('loadUserResponse', {\n          user: toSetUser\n        });\n      }\n    });\n  }\n  /**\n   * Проверяем пользователя - авторизован ли\n   */\n\n\n  onCheckAuth() {\n    _libs_network_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].doGet({\n      url: '/api/session'\n    }).then(response => {\n      if (response.status !== _components_constants_js__WEBPACK_IMPORTED_MODULE_4__[\"OK_RESPONSE\"]) {\n        response.json().then(data => this.localEventBus.callEvent('checkAuthResponse', {\n          isAuth: false,\n          error: data.error\n        }));\n      } else {\n        response.json().then(() => {\n          this.localEventBus.callEvent('checkAuthResponse', {\n            isAuth: true\n          });\n        });\n      }\n    }).catch(error => {\n      this.localEventBus.callEvent('checkAuthResponse', {\n        error\n      });\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/model/profileModel.js?");

/***/ }),

/***/ "./static/js/model/signUpModel.js":
/*!****************************************!*\
  !*** ./static/js/model/signUpModel.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return signUpModel; });\n/* harmony import */ var _libs_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/api.js */ \"./static/js/libs/api.js\");\n/* harmony import */ var _libs_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/validation.js */ \"./static/js/libs/validation.js\");\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/constants.js */ \"./static/js/components/constants.js\");\n\n\n\nclass signUpModel {\n  constructor(eventBus) {\n    this.localEventBus = eventBus;\n    this.localEventBus.getEvent('changeEmail', this.checkChangeEmail.bind(this));\n    this.localEventBus.getEvent('changeLogin', this.checkChangeLogin.bind(this));\n    this.localEventBus.getEvent('changePassword', this.checkChangePassword.bind(this));\n    this.localEventBus.getEvent('signup', this.checkSignUp.bind(this));\n    this.defaultInputVals = {\n      pass: false,\n      login: false,\n      email: false\n    };\n  }\n  /**\n   * Проверка данных на регистрацию\n   * @param {*} data\n   */\n\n\n  checkSignUp(data) {\n    const isValid = Object.entries(this.defaultInputVals).reduce((res, el) => res && el[1], true);\n\n    if (isValid) {\n      _libs_api_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].signUp({\n        email: data.email,\n        login: data.login,\n        password: data.pass\n      }).then(resp => {\n        if (resp.status === _components_constants_js__WEBPACK_IMPORTED_MODULE_2__[\"OK_RESPONSE\"]) {\n          _libs_api_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].login({\n            loginOrEmail: data.login,\n            password: data.pass\n          }).then(() => {\n            this.localEventBus.callEvent('signupSuccess', {});\n          });\n        } else {\n          resp.json().then(data => this.localEventBus.callEvent('signupResponse', data));\n        }\n      }).catch(err => {\n        console.error(err.message);\n      });\n    } else {\n      this.checkChangePassword(data);\n      this.checkChangeEmail(data);\n      this.checkChangeLogin(data);\n    }\n  }\n  /**\n   * Проверка данных на смену пароля\n   * @param {*} data\n   */\n\n\n  checkChangePassword(data) {\n    const pass = data.pass;\n    const errPass = _libs_validation_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].validatePassword(pass);\n\n    if (!errPass) {\n      this.defaultInputVals['pass'] = false;\n      this.localEventBus.callEvent('changePasswordResponse', {\n        error: errPass\n      });\n      return;\n    }\n\n    this.defaultInputVals['pass'] = true;\n    this.localEventBus.callEvent('changePasswordResponse', {});\n  }\n  /**\n   * Проверка данных на смену email\n   * @param {*} data\n   */\n\n\n  checkChangeEmail(data) {\n    const email = data.email;\n    const errEmail = _libs_validation_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].validateEmail(email);\n\n    if (!errEmail) {\n      this.defaultInputVals['email'] = false;\n      this.localEventBus.callEvent('changeEmailResponse', {\n        error: errEmail\n      });\n      return;\n    }\n\n    this.defaultInputVals['email'] = true;\n    this.localEventBus.callEvent('changeEmailResponse', {});\n  }\n  /**\n   * Проверка данных на смену логина\n   * @param {*} data\n   */\n\n\n  checkChangeLogin(data) {\n    const login = data.login;\n    const errLogin = _libs_validation_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].validateLogin(login);\n\n    if (!errLogin) {\n      this.defaultInputVals['login'] = false;\n      this.localEventBus.callEvent('changeLoginResponse', {\n        error: errLogin\n      });\n      return;\n    }\n\n    this.defaultInputVals['login'] = true;\n    this.localEventBus.callEvent('changeLoginResponse', {});\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/model/signUpModel.js?");

/***/ }),

/***/ "./static/js/views/about/aboutView.js":
/*!********************************************!*\
  !*** ./static/js/views/about/aboutView.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return aboutView; });\n/* harmony import */ var _libs_views_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/views.js */ \"./static/js/libs/views.js\");\n/* harmony import */ var _components_userBlock_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/userBlock.js */ \"./static/js/components/userBlock.js\");\n\n\nclass aboutView extends _libs_views_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor({\n    eventBus = {}\n  } = {}) {\n    super('about/aboutView.tmpl', eventBus);\n    this.render(document.getElementsByClassName('body-cnt')[0]);\n    this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));\n  }\n\n  render(root, data = {}) {\n    super.render(root, data);\n    this.localEventBus.callEvent('checkAuthorization');\n  }\n\n  onCheckAuthResponse({\n    isAuthorized = false\n  } = {}) {\n    const checkHeader = new _components_userBlock_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\n    if (checkHeader.changeButtons(isAuthorized)) {\n      const signoutButton = document.getElementsByClassName('js-signout')[0];\n      signoutButton.addEventListener('click', () => {\n        this.localEventBus.callEvent('signOut');\n      });\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/views/about/aboutView.js?");

/***/ }),

/***/ "./static/js/views/leaderboard/leaderboardView.js":
/*!********************************************************!*\
  !*** ./static/js/views/leaderboard/leaderboardView.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return leaderboardView; });\n/* harmony import */ var _libs_views_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/views.js */ \"./static/js/libs/views.js\");\n/* harmony import */ var _components_pagination_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/pagination.js */ \"./static/js/components/pagination.js\");\n/* harmony import */ var _components_userBlock_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/userBlock.js */ \"./static/js/components/userBlock.js\");\n\n\n\nclass leaderboardView extends _libs_views_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor({\n    eventBus = {}\n  }) {\n    super('leaderboard/leaderboardView.tmpl', eventBus);\n    this.render(document.getElementsByClassName('body-cnt')[0]);\n    this.localEventBus.getEvent('loadResponse', this.loadResponse.bind(this));\n    this.localEventBus.getEvent('loadPaginatorResponse', this.loadPaginatorResponse.bind(this));\n    this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));\n    this.pagination = null;\n    this.isClosed = false;\n  }\n\n  render(root, data = {}) {\n    super.render(root, data);\n    this.localEventBus.callEvent('loadPaginator');\n    this.localEventBus.callEvent('load', {\n      pageNum: 1\n    });\n  }\n\n  onCheckAuthResponse({\n    isAuthorized = false\n  } = {}) {\n    const checkHeader = new _components_userBlock_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n\n    if (checkHeader.changeButtons(isAuthorized)) {\n      const signoutButton = document.getElementsByClassName('js-signout')[0];\n      signoutButton.addEventListener('click', () => {\n        this.localEventBus.callEvent('signOut');\n      });\n    }\n  }\n\n  loadPaginatorResponse(data) {\n    if (data.pagesCount !== undefined && data.linksCount !== undefined) {\n      const callbackOnClick = pageNum => {\n        this.localEventBus.callEvent('load', {\n          pageNum\n        });\n      };\n\n      const root = document.getElementsByClassName('js-paginator-buttons')[0];\n      this.pagination = new _components_pagination_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n        countOfPages: data.pagesCount,\n        numOfPositions: data.linksCount,\n        callbackOnClick\n      });\n      this.pagination.render(root);\n    } else {\n      console.error('There is no pageCount or linksCount, while creating Paginator');\n    }\n  }\n\n  loadResponse(data) {\n    super.render(null, {\n      users: data\n    });\n\n    if (this.pagination !== null) {\n      this.pagination.render(document.getElementsByClassName('js-paginator-buttons')[0]);\n    }\n\n    this.afterRender();\n  }\n\n  afterRender() {\n    const backBtn = document.getElementsByClassName('js-back-to-menu')[0];\n    backBtn.addEventListener('click', () => {\n      this.isClosed = true;\n    });\n    this.localEventBus.callEvent('checkAuthorization');\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/views/leaderboard/leaderboardView.js?");

/***/ }),

/***/ "./static/js/views/login/loginView.js":
/*!********************************************!*\
  !*** ./static/js/views/login/loginView.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return loginView; });\n/* harmony import */ var _libs_views_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/views.js */ \"./static/js/libs/views.js\");\n\nclass loginView extends _libs_views_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor({\n    eventBus = {}\n  }) {\n    super('login/loginView.tmpl', eventBus);\n    this.render(document.getElementsByClassName('body-cnt')[0]);\n    this.localEventBus.getEvent('loginResponse', this.onSubmitResponse.bind(this));\n  }\n\n  render(root, data = {}) {\n    super.render(root, data);\n    const form = document.getElementsByClassName('js-login-form')[0];\n    form.addEventListener('submit', this.onSubmit.bind(this, form));\n  } // TODO(): переброс на стартовую страницу после авторизации\n\n\n  onSubmit(form, event) {\n    event.preventDefault();\n    const data = {\n      loginOrEmail: form.elements['login-or-email'].value,\n      pass: form.elements['password-input'].value\n    };\n    this.localEventBus.callEvent('login', data);\n  }\n\n  onSubmitResponse(data) {\n    const error = data.error;\n    console.log(error);\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/views/login/loginView.js?");

/***/ }),

/***/ "./static/js/views/menu/menuView.js":
/*!******************************************!*\
  !*** ./static/js/views/menu/menuView.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return viewMenu; });\n/* harmony import */ var _libs_views_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/views.js */ \"./static/js/libs/views.js\");\n/* harmony import */ var _components_userBlock_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/userBlock.js */ \"./static/js/components/userBlock.js\");\n\n\nclass viewMenu extends _libs_views_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor({\n    eventBus = {}\n  }) {\n    super('menu/menuView.tmpl', eventBus);\n    this.render(document.getElementsByClassName('body-cnt')[0]);\n    this.localEventBus.getEvent('checkAuthorizationResponse', this.onCheckAuthResponse.bind(this));\n  }\n\n  onCheckAuthResponse({\n    isAuthorized = false\n  }) {\n    const checkHeader = new _components_userBlock_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\n    if (checkHeader.changeButtons(isAuthorized)) {\n      const signoutButton = document.getElementsByClassName('js-signout')[0];\n      signoutButton.addEventListener('click', () => {\n        this.localEventBus.callEvent('signOut');\n      });\n    }\n  }\n\n  render(root, data = {}) {\n    super.render(root, data);\n    this.localEventBus.callEvent('checkAuthorization');\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/views/menu/menuView.js?");

/***/ }),

/***/ "./static/js/views/profile/profileView.js":
/*!************************************************!*\
  !*** ./static/js/views/profile/profileView.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return profileView; });\n/* harmony import */ var _libs_views_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/views.js */ \"./static/js/libs/views.js\");\n/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/constants.js */ \"./static/js/components/constants.js\");\n\n\nclass profileView extends _libs_views_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor({\n    eventBus = {}\n  }) {\n    super('profile/profileView.tmpl', eventBus);\n    this.render(document.getElementsByClassName('body-cnt')[0]);\n    this.localEventBus.getEvent('checkAuthResponse', this.onCheckAuthorizationResponse.bind(this));\n    this.localEventBus.getEvent('loadUserResponse', this.onLoadUserResponse.bind(this));\n    this.localEventBus.getEvent('changePasswordResponse', this.onChangePasswodResponse.bind(this));\n    this.localEventBus.getEvent('changeAvatarResponse', this.onChangeAvatarResponse.bind(this));\n    this.localEventBus.getEvent('changeAvatarSuccess', this.onChangeAvatarSuccess.bind(this));\n    this.localEventBus.getEvent('submitPasswordSuccess', this.onSubmitPasswordSuccess.bind(this));\n  }\n\n  render(root, data = {}) {\n    if (root !== undefined) {\n      this.prevRoot = root;\n    }\n\n    this.data = data; //заглушка для линтера\n\n    this.localEventBus.callEvent('checkAuth');\n  }\n\n  onSubmitPasswordSuccess(isOk) {\n    if (isOk) {\n      alert('changed password');\n    }\n  }\n\n  onChangePasswodResponse(data) {\n    this.data = data;\n  }\n\n  onChangeAvatarResponse() {}\n\n  onChangeAvatarSuccess(data) {\n    if (!data.avatar) {\n      return;\n    }\n\n    this.localAvatar.src = data.avatar;\n    this.localEventBus.callEvent('loadUser', data);\n  }\n\n  onCheckAuthorizationResponse(data = {}) {\n    if (data.error || !data.isAuth) {\n      this.localEventBus.callEvent('checkAuthError');\n      return;\n    }\n\n    this.localEventBus.callEvent('loadUser', data);\n  }\n\n  onLoadUserResponse(data = {}) {\n    if (data.error || !data.user) {\n      this.localEventBus.callEvent('checkAuthError');\n      return;\n    } // TODO(): перехать просто на пустую строку вида ''\n\n\n    if (data.user.avatar === _components_constants_js__WEBPACK_IMPORTED_MODULE_1__[\"DEFAULT_AVATAR\"] || data.user.avatar === _components_constants_js__WEBPACK_IMPORTED_MODULE_1__[\"AVATAR_DEFAULT\"]) {\n      data.user.avatar = _components_constants_js__WEBPACK_IMPORTED_MODULE_1__[\"AVATAR_DEFAULT\"];\n    } else {\n      data.user.avatar = _components_constants_js__WEBPACK_IMPORTED_MODULE_1__[\"NETWORK_ADRESS\"] + data.user.avatar;\n    }\n\n    super.render(this.prevRoot, data);\n    const imgTemp = document.getElementsByClassName('avatar-img')[0];\n    imgTemp.src = data.user.avatar;\n    this.initElements();\n  }\n\n  initElements() {\n    this.localAvatar = document.getElementsByClassName('js-upload-avatar')[0];\n    this.localAvatarUploader = document.getElementsByClassName('js-change-image')[0];\n    this.formInput = document.getElementsByClassName('js-change-password')[0];\n    this.passwordSubmit = this.formInput.getElementsByClassName('js-button-submit')[0];\n    this.imputPasswordOld = this.formInput.getElementsByClassName('js-password-old')[0];\n    this.imputPasswordNew = this.formInput.getElementsByClassName('js-password-new')[0];\n    this.initElementsEvents();\n  }\n\n  initElementsEvents() {\n    const signoutButton = document.getElementsByClassName('js-signout')[0];\n    const buttonUp = this.localAvatarUploader;\n    buttonUp.addEventListener('change', () => {\n      this.localEventBus.callEvent('changeAvatar', {\n        avatar: this.localAvatarUploader.files[0]\n      });\n    });\n    signoutButton.addEventListener('click', () => {\n      this.localEventBus.callEvent('signOut');\n    });\n    this.passwordSubmit.addEventListener('click', event => {\n      event.preventDefault();\n      this.localEventBus.callEvent('submitPassword', {\n        newPassword: this.imputPasswordNew.value,\n        oldPassword: this.imputPasswordOld.value\n      });\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/views/profile/profileView.js?");

/***/ }),

/***/ "./static/js/views/signUp/signUpView.js":
/*!**********************************************!*\
  !*** ./static/js/views/signUp/signUpView.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return signUpView; });\n/* harmony import */ var _libs_views_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/views.js */ \"./static/js/libs/views.js\");\n\nclass signUpView extends _libs_views_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor({\n    eventBus = {}\n  }) {\n    super('signUp/signUpView.tmpl', eventBus);\n    this.render(document.getElementsByClassName('body-cnt')[0]);\n    this.localEventBus.getEvent('changeEmailResponse', this.onChangeEmailResponse.bind(this));\n    this.localEventBus.getEvent('changeLoginResponse', this.onChangeLoginResponse.bind(this));\n    this.localEventBus.getEvent('changePasswordResponse', this.onChangePassResponse.bind(this));\n    this.localEventBus.getEvent('changePasswordRepeatResponse', this.onChangeRepassResponse.bind(this));\n    this.localEventBus.getEvent('signupResponse', this.onSignupResponse.bind(this));\n    this.localEventBus.getEvent('signupSuccess', this.onSignUpSuccess.bind(this));\n  }\n\n  render(root, data = {}) {\n    super.render(root, data);\n    this.form = document.getElementsByClassName('js-signup-form')[0];\n    this.passwordInput = this.form.elements['password'];\n    this.passwordInput.addEventListener('change', this.onChangePass.bind(this, this.passwordInput));\n    this.form.addEventListener('submit', this.onSubmit.bind(this));\n  }\n\n  onSignUpSuccess(isAuth = true) {\n    this.isAuth = isAuth;\n  } // TODO(): переброс на стартовую страницу после успешной регистрации\n\n\n  onSignupResponse(data) {\n    const field = data.field;\n    const error = data.error;\n    console.log(error);\n\n    switch (field) {\n      case 'password':\n        this.onChangePassResponse(data);\n        break;\n\n      default:\n        console.error('Undefined field:' + field);\n        break;\n    }\n  }\n\n  onChangeRepassResponse(data) {\n    this.onChangeResponseTmpl(data.error, this.repasswordInput, this.repassWarning);\n  }\n\n  onChangePassResponse(data) {\n    this.onChangeResponseTmpl(data.error, this.passwordInput, this.passWarning);\n  }\n\n  onChangeEmailResponse(data) {\n    this.onChangeResponseTmpl(data.error, this.emailInput, this.emailWarning);\n  }\n\n  onChangeLoginResponse(data) {\n    this.onChangeResponseTmpl(data.error, this.loginInput, this.loginWarning);\n  }\n\n  onChangeResponseTmpl(error) {\n    if (error) {\n      console.log(error);\n      return;\n    }\n  }\n\n  onChangePass(passEl) {\n    const pass = passEl.value;\n    this.localEventBus.callEvent('changePassword', {\n      pass\n    });\n  }\n\n  onSubmit(event) {\n    event.preventDefault();\n    const email = this.form.elements['email'].value;\n    const login = this.form.elements['login'].value;\n    const pass = this.form.elements['password'].value;\n    this.localEventBus.callEvent('signup', {\n      email,\n      login,\n      pass\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./static/js/views/signUp/signUpView.js?");

/***/ })

/******/ });