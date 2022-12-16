import API, {ChatsUsersApi, DeleteChatsUsersData, UpdateChatsUsersData} from '../API/ChatsUsersApi';

export class ChatsUsersController {
  private readonly api: ChatsUsersApi;

  constructor() {
    this.api = API;
  }

  async addUserChat(data: UpdateChatsUsersData) {
    try {
      await this.api.update(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  async removeUserChat(data: DeleteChatsUsersData) {
    try {
      await this.api.delete(data);
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new ChatsUsersController();
