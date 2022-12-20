import API, {ChatAPI, CreateChatData} from '../API/ChatApi';
import store from '../utils/store';

export class ChatController {
  private readonly api: ChatAPI;

  constructor() {
    this.api = API;
  }

  async getChats() {
    try {
      let res = await this.api.read();
      store.set('chats', res)
    } catch (e: any) {
      console.error(e);

    }
  }
  async createChat(data: CreateChatData) {
    try {
      await this.api.create(data);
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new ChatController();
