import View from '../../libs/views';
import template from './loginView.tmpl.xml';

import '../../components/userBlock/userblock.scss';
import '../../../css/form.scss';
import { OK_VALIDATE_LOGIN, OK_VALIDATE_PASSWORD } from '../../components/constants';

export default class loginView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('loginResponse', this.onSubmitResponse.bind(this));
        this.localEventBus.getEvent('loginOrEmailRTCheckResponse', this.loginOrEmailRTCheckResponse.bind(this));
        this.localEventBus.getEvent('passwRTCheckResponse', this.passwRTCheckResponse.bind(this));
        this.loginOrEmailValue = '';
        this.passwordValue = '';
    }

    passwRTCheckResponse({response = ''}) {
        console.log(`passwRTCheckResponse ${response}`);
        this.passwordValue = response;
    }

    loginOrEmailRTCheckResponse({response = ''}) {
        console.log(`loginOrEmailRTCheckResponse ${response}`);
        this.loginOrEmailValue = response;
    }

    render(root, data = {}) {
        super.render(root, data);
        const form = document.getElementsByClassName('js-login-form')[0];
        form.addEventListener('submit', this.onSubmit.bind(this, form));

        this.loginOrEmailInput = document.getElementsByClassName('js-login-or-email')[0];
        this.passwInput = document.getElementsByClassName('js-password')[0];

        this.loginOrEmailInput.addEventListener('change', this.loginOrEmailRTCheck.bind(this, this.loginOrEmailInput));
        this.passwInput.addEventListener('change', this.passwRTCheck.bind(this, this.passwInput));
        return this;
    }

    loginOrEmailRTCheck(input) {
        this.localEventBus.callEvent('loginOrEmailRTCheck', {data: input.value});
    }

    passwRTCheck(input) {
        this.localEventBus.callEvent('passwRTCheck', {data: input.value});
    }

    onSubmit(form, event) {
        event.preventDefault();
        if (this.loginOrEmailValue !== OK_VALIDATE_LOGIN && this.passwordValue !== OK_VALIDATE_PASSWORD) {
            console.log('Cant validate!!!');
        } else {
            this.localEventBus.callEvent('login', {
                loginOrEmail: this.loginOrEmailInput.value, pass:this.passwInput.value
            });
        }
    }

    onSubmitResponse(data) {
        const error = data.error;
        console.log(error);

        // TODO(): добавление стиля к полям, что все хуево, понять - почему не светится красным
        console.log(data);
        const incorrectField = document.getElementsByClassName(data.inputField)[0];
        incorrectField.classList.add('invalid');
    }
}
