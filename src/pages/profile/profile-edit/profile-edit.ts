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

class ProfileEditBase extends Block {
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

    this.children.displayName = new Input({
      name: 'display_name',
      type: 'text',
      placeholder: 'Никнэйм'
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
