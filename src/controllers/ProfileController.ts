import API, { UserAPI, UpdateProfileData, UpdateProfileAvatarData, UpdatePasswordData } from '../API/UserApi';

export class ProfileController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async changeProfile(data: UpdateProfileData) {
    try {
      await this.api.updateProfile(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  async changeAvatar(data: UpdateProfileAvatarData) {
    try {
      await this.api.updateProfileAvatar(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  async changePassword(data: UpdatePasswordData) {
    try {
      await this.api.updatePassword(data);
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new ProfileController();
