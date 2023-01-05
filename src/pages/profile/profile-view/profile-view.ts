import Block from '../../../block';
import template from './profile-view.hbs';
import { withStore } from '../../../utils/store';
import AuthController from '../../../controllers/AuthController';
import { Button } from '../../../components/button/button';
import './profile-view.scss';
import router from "../../../utils/router";
import {Routes} from "../../../utils/routes";
import './profile-view.scss'
import {Input} from "../../../components/input/input";
import ProfileController from "../../../controllers/ProfileController";

class ProfileViewBase extends Block {
  init() {
    console.log('profileViewInit');
    AuthController.fetchUser();

    this.children.avatarInput = new Input({
      name: 'avatar-file',
      type: 'file',
      events: {
        change: async (event) => {
          console.log(event);
          const target = event.target as HTMLInputElement
          const file = target.files?.[0];
          if (file) {
            await ProfileController.changeAvatar({avatar: file})
            await AuthController.fetchUser();
          }
        }
      }
    })

    this.children.button = new Button({
      label: 'Выйти',
      events: {
        click: () => {
          AuthController.logout();
        }
      }
    })

    this.children.editButton = new Button({
      label: 'редактировать',
      events: {
        click: () => {
          router.go(Routes.ProfileEdit)
        }
      }
    })
    this.children.changePasswordButton = new Button({
      label: 'редактировать password',
      events: {
        click: () => {
          router.go(Routes.ChangePassword)
        }
      }
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user, avatarSrc: 'https://ya-praktikum.tech/api/v2/resources/' + encodeURI(state.user?.avatar) }))

export const ProfileViewPage = withUser(ProfileViewBase);
