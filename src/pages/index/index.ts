import { LoginPage } from '../auth/auth';
import { RegisterPage } from '../registration/registration';
import Router from '../../utils/router';
import AuthController from '../../controllers/AuthController';
import {Nav} from './nav';
import {render} from "../../block/render";
import {Routes} from "../../utils/routes";
import {ChatPage} from "../chat/chat";
import {ProfileChangePasswordPage} from "../profile/profile-change-password/PCP";
import {ProfileViewPage} from "../profile/profile-view/profile-view";
import {ProfileEditPage} from "../profile/profile-edit/profile-edit";
import {NotFoundPage} from "../404/404";



window.addEventListener('DOMContentLoaded', async () => {
  render('body', new Nav(), "prepend");

  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Register, RegisterPage)
    .use(Routes.Profile, ProfileViewPage)
    .use(Routes.Auth, LoginPage)
    .use(Routes.Chat, ChatPage)
    .use(Routes.ChangePassword, ProfileChangePasswordPage)
    .use(Routes.ProfileEdit, ProfileEditPage)
    .useNotFound(NotFoundPage)


  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      // Router.go(Routes.Profile)
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      // Router.go(Routes.Index);
    }
  }

});
