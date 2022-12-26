import API, {
  ChatAPI,
  CreateChatData,
  DeleteChatData,
  DeleteChatsUsersData,
  GetTokenChatData,
  UpdateChatsUsersData
} from '../API/ChatApi';
import store from '../utils/store';
import MessagesController from './MessagesController';

class ChatsController {
  private readonly api: ChatAPI;

  constructor() {
    this.api = API;
  }

  async create(data: CreateChatData) {
    try {
      await this.api.create(data);
      await this.fetchChats();
    } catch (e: any) {
      console.error(e);
    }
  }

  async fetchChats() {
    const chats = await this.api.read();

    chats.map(async (chat) => {
      const token = await this.getToken({chatId: chat.id});
      if (token) {
        await MessagesController.connect(chat.id, token);
      }
    });

    store.set('chats', chats);
  }

  async addUserToChat(data: UpdateChatsUsersData) {
    try {
      return await this.api.addUser(data);
    } catch (e:any) {
      console.error(e.message);
    }

  }

  async removeUserChat(data: DeleteChatsUsersData) {
    try {
      await this.api.deleteUser(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  async delete(data: DeleteChatData) {
    try {
      await this.api.delete(data);
      await this.fetchChats();
    } catch (e:any) {
      console.error(e);
    }

  }

  async getToken(data: GetTokenChatData) {
    try {
      return await this.api.getToken(data);
    } catch (e:any) {
      console.error(e);
    }

  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }
}

const controller = new ChatsController();

export default controller;
