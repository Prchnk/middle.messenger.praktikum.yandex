import BaseAPI from './BaseAPI';

export interface CreateChatData {
  title: string;
}

export interface DeleteChatData {
  chatId: number;
}

export type ReadChatResponse = Chat[];

export interface Chat {
  id: number;
  title: string;
  avatar: null; // TODO
  created_by: number;
  unread_count: number;
  last_message: number | null;
}

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }
  read() {
    return this.http.get<ReadChatResponse>('');
  }
  create(data: CreateChatData) {
    return this.http.post('', data);
  }
  delete(data: DeleteChatData) {
    return this.http.delete('', data);
  }
  update = undefined;

}

export default new ChatAPI();
