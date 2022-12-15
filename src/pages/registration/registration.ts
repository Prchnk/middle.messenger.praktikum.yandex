import Block from '../../block';
import template from './registration.hbs';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Link } from '../../components/link/link';
import { SignupData } from '../../API/Auth.Api';
import AuthController from '../../controllers/AuthController';
import './registration.scss';

export class RegisterPage extends Block {
  constructor() {
    console.log('RegisterPage');
    super({});
  }

  init() {
    this.children.firstName = new Input({
      name: 'first_name',
      type: 'text',
      placeholder: 'Имя'
    });

    this.children.secondName = new Input({
      name: 'second_name',
      type: 'text',
      placeholder: 'Фамилия'
    });

    this.children.email = new Input({
      name: 'email',
      type: 'email',
      placeholder: 'E-mail'
    });

    this.children.phone = new Input({
      name: 'phone',
      type: 'tel',
      placeholder: 'Телефон'
    });

    this.children.login = new Input({
      name: 'login',
      type: 'text',
      placeholder: 'Логин'
    });

    this.children.password = new Input({
      name: 'password',
      type: 'password',
      placeholder: 'Пароль'
    });

    this.children.button = new Button({
      label: 'Зарегистрироваться',
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.link = new Link({
      label: 'Войти',
      to: '/'
    });
  }

  onSubmit() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))

    const data = Object.fromEntries(values);

    AuthController.signup(data as SignupData);
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

// import RegistrationTemplate from './registration.hbs';
// import {render} from '../../block/render';
// import {InputRegistration} from "../../components/input/input";
// import {querySelector} from "../../helpers/helpers";
// import {ValidatorForm} from "../../helpers/classes/ValidatorForm";
//
//
// const FORM_DATA = {
// 	title: 'Данные пользователя',
// 	list: [
// 		{name: 'first_name', label: 'Ваше имя', type: 'text'},
// 		{name: 'second_name', label: 'Ваша фамилия', type: 'text'},
// 		{name: 'login', label: 'Логин', type: 'text'},
// 		{name: 'phone', label: 'Ваш телефон', type: 'text'},
// 		{name: 'email', label: 'Ваша почта', type: 'text'},
// 		{name: 'password', label: 'Придумайте пароль', type: 'password'},
// 		{name: 'display_name', label: 'Придумайте ник', type: 'text'},
//
// 	]
// };
// function renderHbs() {
//
//
// 	const outputNode = querySelector('#output');
// 	outputNode.innerHTML = RegistrationTemplate(FORM_DATA);
//
// 	const registrationFormNode: HTMLFormElement = querySelector('.form_registration', outputNode) as HTMLFormElement;
//
// 	const controlsNode = querySelector('.controls', registrationFormNode);
// 	FORM_DATA.list.forEach(props =>
// 		render(controlsNode, (new InputRegistration(props)))
// 	)
//
// 	const registrationValidatorForm = new ValidatorForm(registrationFormNode);
// 	registrationValidatorForm.init();
// }
//
// renderHbs();
