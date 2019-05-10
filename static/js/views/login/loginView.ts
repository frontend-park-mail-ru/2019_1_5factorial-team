import View from '../../libs/views';
import * as template from './loginView.tmpl.xml';

import '../../components/userBlock/userblock.scss';
import '../../../css/form.scss';
import EventBus from '../../libs/eventBus';

export default class loginView extends View {
    constructor(eventBus: EventBus) {
        super(template, eventBus);
        this.render(document.getElementsByClassName('body-cnt')[0]);
        this.localEventBus.getEvent('loginResponse', this.onSubmitResponse.bind(this));
    }

    render(root: Element, data = {}) {
        super.render(root, data);
        const form = document.getElementsByClassName('js-login-form')[0];
        form.addEventListener('submit', this.onSubmit.bind(this, form));
        return this;
    }

    onSubmit(form: { elements: { [x: string]: { value: any; }; }; }, event: Event) {
        event.preventDefault();
        const data = {
            loginOrEmail: form.elements['login-or-email'].value,
            pass: form.elements['password-input'].value
        };
        this.localEventBus.callEvent('login', data);
    }

    onSubmitResponse(data: { error: any; inputField: string; }) {
        const error = data.error;
        console.log(error);

        // TODO(): добавление стиля к полям, что все хуево, понять - почему не светится красным
        console.log(data);
        const incorrectField = document.getElementsByClassName(data.inputField)[0];
        incorrectField.classList.add('invalid');
    }
}
