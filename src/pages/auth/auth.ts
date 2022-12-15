import Block from '../../block';
import template from './auth.hbs';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Link } from '../../components/link/link';
import { SignupData } from '../../API/Auth.Api';
import AuthController from '../../controllers/AuthController';
import '../../scss/global.scss';

export class LoginPage extends Block {
  constructor() {
    super({});
  }

  init() {
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
      label: 'Войти',
      events: {
        click: () => this.onSubmit()
      },
    });

    this.children.link = new Link({
      label: 'Регистрация',
      to: '/registration/'
    });
  }

  onSubmit() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))

    const data = Object.fromEntries(values);

    AuthController.signin(data as SignupData);
  }

  render() {
    return this.compile(template, {...this.props});
  }
}







// import AuthTemplate from './auth.hbs';
// import {querySelector} from "../../helpers/helpers";
// import {ValidatorForm} from "../../helpers/classes/ValidatorForm";
// import {render} from "../../block/render";
// import {InputRegistration} from "../../components/input/input";
// import {Button} from '../../components/button/button';
//
//
// const FORM_DATA = {
//   title: 'Авторизация пользователя',
//   list: [
//     {name: 'login', label: 'Логин', type: 'text'},
//     {name: 'password', label: 'Пароль', type: 'password'},
//   ],
// };
//
// function renderHbs() {
//   const outputNode = querySelector('#output');
//   outputNode.innerHTML = AuthTemplate(FORM_DATA);
//
//   const injectedInputsNode = querySelector('.injectedInputs', outputNode);
//   const authFormNode: HTMLFormElement = querySelector('.form_auth', outputNode) as HTMLFormElement;
//   const injectedBtnSubmitNode = querySelector('.injectedBtnSubmit', outputNode);
//
//   FORM_DATA.list.forEach(props =>
//     render(injectedInputsNode, (new InputRegistration(props)))
//   )
//
//   render(injectedBtnSubmitNode, (new Button({
//     type: 'submit',
//     cssClasses: ['btn', 'btn-submit'],
//     htmlContent: 'Авторизоваться'
//   })));
//
//   const authValidatorForm = new ValidatorForm(authFormNode);
//   authValidatorForm.init();
// }
//
// renderHbs();
