import Block from '../../../block';
import template from './profile-edit.hbs';
import { withStore } from '../../../utils/store';
import { Button } from '../../../components/button/button';
import {Input} from "../../../components/input/input";
import ProfileController from "../../../controllers/ProfileController";
import {UpdateProfileData} from "../../../API/UserApi";
import AuthController from "../../../controllers/AuthController";
import router from "../../../utils/router";
import {Routes} from "../../../utils/routes";
import { onInput } from '../../../utils/validations/input';
import { InputMessage } from '../../../components/input-message/input-message';
import * as PATTERNS from '../../../utils/validations/patterns';

enum InputFieldName {
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
  DISPLAY_NAME = 'display_name',
  EMAIL = 'email',
  PHONE = 'phone',
  LOGIN = 'login',
}

class ProfileEditBase extends Block {
  validationErrors = {} as Record<InputFieldName, boolean>;

  init() {
    this.children.firstNameError = new InputMessage({
      message: PATTERNS.FIRST_NAME_ERROR,
    });

    this.children.firstName = new Input({
      name: InputFieldName.FIRST_NAME,
      type: 'text',
      placeholder: 'Имя',
      value: this.props.first_name,
      events: {
        input: onInput({
          getButton: () => this.children.saveButton as Button,
          getErrors: () => this.validationErrors,
          getInputMessage: () => this.children.firstNameError as InputMessage,
          inputName: InputFieldName.FIRST_NAME,
          pattern: PATTERNS.FIRST_NAME,
        }),
      }
    });

    this.children.secondNameError = new InputMessage({
      message: PATTERNS.FIRST_NAME_ERROR,
    });

    this.children.secondName = new Input({
      name: InputFieldName.SECOND_NAME,
      type: 'text',
      placeholder: 'Фамилия',
      value: this.props.second_name,
      events: {
        input: onInput({
          getButton: () => this.children.saveButton as Button,
          getErrors: () => this.validationErrors,
          getInputMessage: () => this.children.secondNameError as InputMessage,
          inputName: InputFieldName.SECOND_NAME,
          pattern: PATTERNS.SECOND_NAME,
        }),
      }
    });

    this.children.displayNameError = new InputMessage({
      message: PATTERNS.DISPLAY_NAME_ERROR,
    });

    this.children.displayName = new Input({
      name: InputFieldName.DISPLAY_NAME,
      type: 'text',
      placeholder: 'Nickname',
      value: this.props.display_name,
      events: {
        input: onInput({
          getButton: () => this.children.saveButton as Button,
          getErrors: () => this.validationErrors,
          getInputMessage: () => this.children.displayNameError as InputMessage,
          inputName: InputFieldName.DISPLAY_NAME,
          pattern: PATTERNS.DISPLAY_NAME,
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
      value: this.props.email,
      events: {
        input: onInput({
          getButton: () => this.children.saveButton as Button,
          getErrors: () => this.validationErrors,
          getInputMessage: () => this.children.emailError as InputMessage,
          inputName: InputFieldName.EMAIL,
          pattern: PATTERNS.EMAIL,
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
      value: this.props.phone,
      events: {
        input: onInput({
          getButton: () => this.children.saveButton as Button,
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
      name: 'login',
      type: 'text',
      placeholder: 'Логин',
      value: this.props.login,
      events: {
        input: onInput({
          getButton: () => this.children.saveButton as Button,
          getErrors: () => this.validationErrors,
          getInputMessage: () => this.children.loginError as InputMessage,
          inputName: InputFieldName.LOGIN,
          pattern: PATTERNS.LOGIN,
        }),
      }
    });

    this.children.saveButton = new Button({
      label: 'сохранить',
      events: {
        click: async () => {
          const data = Object.keys(this.children).reduce<UpdateProfileData>((acc, key) => {
            const child = this.children[key]
            if (child instanceof Input) {
              acc[child.getName() as keyof UpdateProfileData] = child.getValue();
            }
            return acc;
          }, {} as UpdateProfileData);
          try {
            await ProfileController.changeProfile(data)
            router.go(Routes.Profile)
            await AuthController.fetchUser();
          } catch (err) {
            console.log(err);
          }

        }
      }
    })

    this.children.cancelButton = new Button({
      label: 'отмена',
      events: {
        click: () => {
          router.go(Routes.Profile)

        }
      }
    })
  }



  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }))

export const ProfileEditPage = withUser(ProfileEditBase);
