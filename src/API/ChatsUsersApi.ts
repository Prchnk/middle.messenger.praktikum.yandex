import BaseAPI from './BaseAPI';

export interface UpdateChatsUsersData {
  chatId: number;
  users: number[];
}
export interface DeleteChatsUsersData {
  chatId: number;
  users: number[];
}

export class ChatsUsersApi extends BaseAPI {
  constructor() {
    super('/chats/users');
  }
  read = undefined;
  create = undefined;
  delete(data: DeleteChatsUsersData) {
    return this.http.delete('', data);
  }
  update(data: UpdateChatsUsersData) {
    return this.http.put('', data);
  }
}

export default new ChatsUsersApi();
