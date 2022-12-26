import BaseAPI from './BaseAPI';

export interface UpdateProfileData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface UpdateProfileAvatarData {
 avatar: File;
}

export interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  updateProfile(data: UpdateProfileData) {
    return this.http.put('/profile', data);
  }

  updateProfileAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data);
  }

  updatePassword(data: UpdatePasswordData) {
    return this.http.put('/password', data);
  }
}

export default new UserAPI();
