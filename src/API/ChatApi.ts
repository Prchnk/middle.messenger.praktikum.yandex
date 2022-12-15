import BaseAPI from './BaseAPI';

export interface CreateChatData {
  title: string;
}

export interface DeleteChatData {
  chatId: number;
}

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }
  read() {
    return this.http.get('')
  }
  create(data: CreateChatData) {
    return this.http.post('', data)
  }
  delete(data: DeleteChatData) {
    return this.http.delete('', data)
  }
  update = undefined;

}

export default new ChatAPI();
