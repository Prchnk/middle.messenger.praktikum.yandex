import API, { AuthAPI, SigninData, SignupData } from '../API/AuthApi';
import store from '../utils/store';
import router from '../utils/router';
import {Routes} from "../utils/routes";

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();
      store.set('user', user);
    } catch (e: any) {
      console.error(e.message);
    }

  }

  async logout() {
    try {
      await this.api.logout();

      router.go(Routes.Index);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
