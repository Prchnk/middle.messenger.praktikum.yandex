import Block from '../../../block';
import template from './chat-list.hbs';
import store, { withStore } from '../../../utils/store';
import { ChatListItem } from './chat-list-item';
import { Chat } from '../../../API/ChatApi';

class ChatListBase extends Block {
  init() {

  }

  componentDidUpdate() {
    this.children.chats = (this.props.chats || []).map((chat: Chat) => {
      return new ChatListItem({
        ...chat,
        events: {
          click: () => {
            console.log('onclick', chat);
            store.set('selectedChatId', chat.id);
          }
        }
      })
    });

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withState = withStore((state) => {
  return ({ chats: state.chats });
});

export const ChatList = withState(ChatListBase);
