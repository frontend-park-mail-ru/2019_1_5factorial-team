import View from '../../libs/views.js';

export default class signUpView extends View {
    constructor({ eventBus = {} }) {
        super('signUp/signUpView.tmpl', eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('signupResponse', this.onSignupResponse.bind(this));
        this.localEventBus.getEvent('signupSuccess', this.onSignUpSuccess.bind(this));
    }

    render(root, data = {}) {
        super.render(root, data);

        this.form = document.getElementsByClassName('js-signup-form')[0];
        this.passwordInput = this.form.elements['password'];
        this.form.addEventListener('submit', this.onSubmit.bind(this));
    }

    onSignUpSuccess(isAuth = true) {
        this.isAuth = isAuth;
    }

    // TODO(): переброс на стартовую страницу после успешной регистрации
    onSignupResponse(data) {
        // switch-case на ответы валидации и нужные поля DOM'a
        // data - validate* возвращает стрингу из валидации
        console.log(data);
    }

    onSubmit(event) {
        event.preventDefault();
        const email = this.form.elements['email'].value;
        const login = this.form.elements['login'].value;
        const pass = this.form.elements['password'].value;

        this.localEventBus.callEvent('signup', { email, login, pass });
    }
}
