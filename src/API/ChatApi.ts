import BaseAPI from './BaseAPI';

export interface CreateChatData {
  title: string;
}

export interface DeleteChatData {
  chatId: number;
}

export interface GetTokenChatData {
  chatId: number;
}

export interface UpdateChatsUsersData {
  chatId: number;
  users: number[];
}
export interface DeleteChatsUsersData {
  chatId: number;
  users: number[];
}

export type ReadChatResponse = Chat[];

export interface Chat {
  id: number;
  title: string;
  avatar: string | null;
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
  async getToken(data: GetTokenChatData): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${data.chatId}`);

    return response.token;
  }

  deleteUser(data: DeleteChatsUsersData) {
    return this.http.delete('/users', data);
  }
  addUser(data: UpdateChatsUsersData) {
    return this.http.put('/users', data);
  }

}

export default new ChatAPI();
