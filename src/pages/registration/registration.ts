import Block from '../../block';
import template from './registration.hbs';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Link } from '../../components/link/link';
import { SignupData } from '../../API/AuthApi';
import AuthController from '../../controllers/AuthController';
import './registration.scss';
import { InputMessage } from '../../components/input-message/input-message';

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
      placeholder: 'Пароль',
      events: {
        input: (event) => {
          const { value } = event.target as HTMLInputElement;
          const hasError = value.length < 3;
          (this.children.passwordError as InputMessage).setProps({ isVisible: hasError });
        }
      }
    });

    this.children.passwordError = new InputMessage({
      message: 'Length must be > 3',
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
