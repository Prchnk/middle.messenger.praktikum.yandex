import Block from '../../block';
import template from './registration.hbs';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Link } from '../../components/link/link';
import { SignupData } from '../../API/AuthApi';
import AuthController from '../../controllers/AuthController';
import './registration.scss';
import { InputMessage } from '../../components/input-message/input-message';
import { getValidationErrorsInitial, onInput } from '../../utils/validations/input';
import * as PATTERNS from '../../utils/validations/patterns';
  

enum InputFieldName {
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
  EMAIL = 'email',
  PHONE = 'phone',
  LOGIN = 'login',
  PASSWORD = 'password',
}
export class RegisterPage extends Block {
  validationErrors = getValidationErrorsInitial(InputFieldName);

  constructor() {
    super({});
  }

  init() {
    this.children.firstNameError = new InputMessage({
      message: PATTERNS.FIRST_NAME_ERROR,
    });

    this.children.firstName = new Input({
      name: InputFieldName.FIRST_NAME,
      type: 'text',
      placeholder: 'Имя',
      events: {
        input: onInput({
          getButton: () => this.children.button as Button,
          getErrors: () => this.validationErrors,
          getInputMessage: () => this.children.firstNameError as InputMessage,
          inputName: InputFieldName.FIRST_NAME,
          pattern: PATTERNS.FIRST_NAME,
        }),
      }
    });

    this.children.secondNameError = new InputMessage({
      message: PATTERNS.SECOND_NAME_ERROR,
    });

    this.children.secondName = new Input({
      name: InputFieldName.SECOND_NAME,
      type: 'text',
      placeholder: 'Фамилия',
      events: {
        input: onInput({
          getButton: () => this.children.button as Button,
          getErrors: () => this.validationErrors,
          getInputMessage: () => this.children.secondNameError as InputMessage,
          inputName: InputFieldName.SECOND_NAME,
          pattern: PATTERNS.SECOND_NAME,
        }),
      }
    });

    this.children.emailError = new InputMessage({
      message: PATTERNS.EMAIL_ERROR,
    });

    this.children.email = new Input({
      name: InputFieldName.EMAIL,
      type: 'email',
      placeholder: 'E-mail',
      events: {
        input: onInput({
          getButton: () => this.children.button as Button,
          getErrors: () => this.validationErrors,
          getInputMessage: () => this.children.emailError as InputMessage,
          inputName: InputFieldName.EMAIL,
          pattern: PATTERNS.EMAIL
        }),
      }
    });

    this.children.phoneError = new InputMessage({
      message: PATTERNS.PHONE_ERROR,
    });

    this.children.phone = new Input({
      name: InputFieldName.PHONE,
      type: 'tel',
      placeholder: 'Телефон',
      events: {
        input: onInput({
          getButton: () => this.children.button as Button,
          getErrors: () => this.validationErrors,
          getInputMessage: () => this.children.phoneError as InputMessage,
          inputName: InputFieldName.PHONE,
          pattern: PATTERNS.PHONE,
        }),
      }
    });

    this.children.loginError = new InputMessage({
      message: PATTERNS.LOGIN_ERROR,
    });

    this.children.login = new Input({
      name: InputFieldName.LOGIN,
      type: 'text',
      placeholder: 'Логин',
      events: {
        input: onInput({
          getButton: () => this.children.button as Button,
          getErrors: () => this.validationErrors,
          getInputMessage: () => this.children.loginError as InputMessage,
          inputName: InputFieldName.LOGIN,
          pattern: PATTERNS.LOGIN,
        }),
      },
    });

    this.children.passwordError = new InputMessage({
      message: PATTERNS.PASSWORD_ERROR,
    });
  
    this.children.password = new Input({
      name: InputFieldName.PASSWORD,
      type: 'password',
      placeholder: 'Пароль',
      events: {
        input: onInput({
          getButton: () => this.children.button as Button,
          getErrors: () => this.validationErrors,
          getInputMessage: () => this.children.passwordError as InputMessage,
          inputName: InputFieldName.PASSWORD,
          pattern: PATTERNS.PASSWORD,
        }),
      }
    });

    this.children.button = new Button({
      label: 'Зарегистрироваться',
      isDisabled: true,
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
