import API, {UpdatePasswordData, UpdateProfileAvatarData, UpdateProfileData, UserAPI} from '../API/UserApi';

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
    let formData = new FormData();
    formData.append('avatar', data.avatar.slice(), data.avatar.name)
    return await this.api.updateProfileAvatar(formData);

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
