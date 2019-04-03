export const FIRST_POS = 1;

export const EVENT_LIST_ABOUT = [
    'checkAuthorizationResponse',
    'checkAuthorization',
    'signOut',
    'closeView'
];

export const EVENT_LIST_LEADERBOARS = [
    'checkAuthorizationResponse',
    'checkAuthorization',
    'load',
    'loadResponse',
    'loadPaginator',
    'loadPaginatorResponse',
    'checkAuthError',
    'signOut',
    'closeView'
];

export const EVENT_LIST_LOGIN = [
    'login',
    'loginResponse',
    'loginSuccess',
    'loadWaiting'
];

export const EVENT_LIST_MENU = [
    'checkAuthorizationResponse',
    'checkAuthorization',
    'signoutResponse',
    'signOut',
    'closeView'
];

export const EVENT_LIST_PROFILE = [
    'checkAuth',
    'checkAuthResponse',
    'loadUser',
    'loadUserResponse',
    'checkAuthError',
    'changeEmail',
    'changeEmailResponse',
    'changePassword',
    'changePasswordResponse',
    'changeAvatar',
    'changeAvatarResponse',
    'changeAvatarSuccess',
    'submitEmail',
    'submitEmailResponse',
    'submitEmailSuccess',
    'submitPassword',
    'submitPasswordResponse',
    'submitPasswordSuccess',
    'logOutResponse',
    'signOut',
    'closeView'
];

export const EVENT_LIST_SIGNUP = [
    'signup',
    'signupResponse',
    'signupSuccess',
    'changeEmail',
    'changeEmailResponse',
    'changeLogin',
    'changeLoginResponse',
    'changePassword',
    'changePasswordResponse',
    'changePasswordRepeat',
    'changePasswordRepeatResponse',
    'loadWaiting'
];

export const NETWORK_ADRESS = 'http://78.155.207.69:5051';
// export const NETWORK_ADRESS = 'http://localhost:5051';

export const EMAIL_EXPRESSION = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/);
export const MIN_LENGTH = 4;
export const DEFAULT_AVATAR = '';
export const AVATAR_DEFAULT = '../../../img/default.jpg';

export const ANAUTH_RESPONSE = 401;
export const OK_RESPONSE = 200;

export const COUNT_OF_PAGES = 5;
export const NUM_OF_POSITIONS = 5;

export const OK_VALIDATE_LOGIN = 'Ok login';
export const OK_VALIDATE_EMAIL = 'Ok email';
export const OK_VALIDATE_PASSWORD = 'Ok password';
export const OK_VALIDATE_AVATAR = 'Ok avatar';
export const JPEG_AVATAR_FORMAT = 'image/jpeg';
export const PNG_AVATAR_FORMAT = 'image/png';
export const INCORRECT_EMAIL = 'Email is incorrect!';
export const TOO_SHORT_LOGIN = 'Login needs to be at least 4 symbols!';
export const TOO_SHORT_PASSWORD = 'Password needs to be at least 4 symbols!';
export const INCORRECT_LOGIN_OR_EMAIL = 'Incorrect login or email!';
export const INCORRECT_AVATAR_FORMAT = 'Avatar must be jpeg or png format!';

export const MAP_OF_MODALS = new Map ([
    ['Game multi end', ''],
    ['Game multi leave', ''],
    ['Game training', ''],
    ['Game single end', ''],
    ['Game single pause', ''],
    ['Game single leave', ''],
    ['Menu multi waiting for player', ''],
    ['Menu multi error login', ''],
    ['Profile change password', '<label class="form__label"><input class="form__input form__input_profile js-password-old" type="password" id="old-password" placeholder="Enter old password" autocomplete="current-password"/></label><label class="form__label"><input class="form__input form__input_profile js-password-new" type="password" id="new-password" placeholder="Enter new password" autocomplete="new-password"/></label><button class="btn btn_contained form__btn form__btn_change-password js-button-submit" type="submit">Change password</button>'],
    ['Shop error login', ''],
]);