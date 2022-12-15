import Block from '../../block';
import template from './chat-list.hbs';
import { withStore } from '../../utils/store';

class ChatListBase extends Block {
  init() {
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withState = withStore((state) => {
  return ({chats: state.chats })
})



export const ChatPage = withState(ChatListBase);
