import Block from '../../../block';
import template from './profile-view.hbs';
import { withStore } from '../../../utils/store';
import AuthController from '../../../controllers/AuthController';
import { Button } from '../../../components/button/button';
import './profile-view.scss';
import router from "../../../utils/router";
import {Routes} from "../../../utils/routes";
import avatar from '../../../img/avatar.png';
import './profile-view.scss'

class ProfileViewBase extends Block {
  init() {
    console.log('profileViewInit');
    AuthController.fetchUser();

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

const withUser = withStore((state) => ({ ...state.user, avatar }))

export const ProfileViewPage = withUser(ProfileViewBase);
