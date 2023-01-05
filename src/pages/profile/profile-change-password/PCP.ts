import Block from '../../../block';
import template from './PCP.hbs';
import {withStore} from '../../../utils/store';
import {Button} from '../../../components/button/button';
import {Input} from "../../../components/input/input";
import ProfileController from "../../../controllers/ProfileController";
import {UpdatePasswordData} from "../../../API/UserApi";
import router from "../../../utils/router";
import {Routes} from "../../../utils/routes";

class ProfileChangePasswordBase extends Block {
  init() {

    this.children.oldPassword = new Input({
      name: 'oldPassword',
      type: 'password',
      placeholder: 'старый пароль'
    });
    this.children.newPassword = new Input({
      name: 'newPassword',
      type: 'password',
      placeholder: 'новый пароль'
    });


    this.children.saveButton = new Button({
      label: 'сохранить',
      events: {
        click: async () => {
          const data = Object.keys(this.children).reduce<UpdatePasswordData>((acc, key) => {
            const child = this.children[key]
            if (child instanceof Input) {
              acc[child.getName() as keyof UpdatePasswordData] = child.getValue();
            }
            return acc;
          }, {} as UpdatePasswordData);
          try {
            await ProfileController.changePassword(data);
            router.go(Routes.Profile);
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
          router.go(Routes.Profile);

        }
      }
    })
  }


  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({...state.user}))

export const ProfileChangePasswordPage = withUser(ProfileChangePasswordBase);
