import Block from '../../block';
import template from './auth.hbs';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Link } from '../../components/link/link';
import { SignupData } from '../../API/AuthApi';
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
      to: '/sing-up'
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
