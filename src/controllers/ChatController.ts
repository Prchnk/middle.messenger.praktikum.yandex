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
    await this.api.create(data);

    this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();

    chats.map(async (chat) => {
      const token = await this.getToken({chatId: chat.id});

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  addUserToChat(data: UpdateChatsUsersData) {
    return this.api.addUser(data);
  }

  async removeUserChat(data: DeleteChatsUsersData) {
    try {
      await this.api.deleteUser(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  async delete(data: DeleteChatData) {
    await this.api.delete(data);

    this.fetchChats();
  }

  getToken(data: GetTokenChatData) {
    return this.api.getToken(data);
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }
}

const controller = new ChatsController();

// @ts-ignore
window.chatsController = controller;

export default controller;
