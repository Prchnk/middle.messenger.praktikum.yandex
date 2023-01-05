import Block from '../../block';
import template from './chat.hbs';
import { withStore } from '../../utils/store';
import ChatController from "../../controllers/ChatController";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import './chat.scss';
import { ChatList } from './chat-list/chat-list';
import { ChatCurrent } from './chat-current/chat-current';

class ChatPageBase extends Block {
  init() {
    ChatController.fetchChats();

    this.children.createButton = new Button({
      label: 'создать чат',
      type: 'button',
      events: {
        click: () => this.onSubmit()
      },
      classes: 'create-chat-btn'
    });
    this.children.chatTitle = new Input({
      name: 'title',
      type: 'text',
      placeholder: 'Введите название'
    });

    this.children.chatList = new ChatList({});
    this.children.chatCurrent = new ChatCurrent({});
  }

  async onSubmit() {
    const data = { title: (this.children.chatTitle as Input).getValue() };
    await ChatController.create(data);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withState = withStore((state) => {
  return ({ chats: state.chats })
})


export const ChatPage = withState(ChatPageBase);
