import Block from '../../../block';
import template from './chat-current.hbs';
import { withStore } from '../../../utils/store';
import { Chat } from '../../../API/ChatApi';
import { ChatManager } from '../chat-manager/chat-manager';
import './chat-current.scss'

class ChatCurrentBase extends Block {
  init() {

  }

  componentDidUpdate() {
    this.children.addUser = new ChatManager({ selectedChatId: this.props.selectedChatId });
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withState = withStore((state) => {
  const selectedChatId = state.selectedChatId;
  const chat = (state.chats || []).find((chat: Chat) => chat.id === selectedChatId);

  return ({
    selectedChatId,
    chat,
  });
});

export const ChatCurrent = withState(ChatCurrentBase);
