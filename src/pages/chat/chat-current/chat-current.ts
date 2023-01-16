import Block from '../../../block';
import template from './chat-current.hbs';
import { withStore } from '../../../utils/store';
import { Chat } from '../../../API/ChatApi';
import { ChatManager } from '../chat-manager/chat-manager';
import './chat-current.scss'
import {Input} from "../../../components/input/input";
import {Button} from "../../../components/button/button";
import messagesController from "../../../controllers/MessagesController";
import {Message} from "../message/message";
import { querySelector } from '../../../utils/helpers';

interface Props {
  userId: number;
  messages: Message[];
  selectedChatId: number;
  chat: Chat;
}
class ChatCurrentBase extends Block<Props> {
  init() {
    this.children.messageInput = new Input({
      type: 'text',
      name: 'userId',
      placeholder: 'введите сообщение',
    });

    this.children.sendButton = new Button({
      label: 'отправить',
      type: 'submit',
      classes: 'send-button'
    });

  }
  componentDidMount(): void {
    console.log('chat-current CDU');
    querySelector('form', this.element).addEventListener('submit', (event) =>{
      event.preventDefault();
      messagesController.sendMessage(this.props.selectedChatId, (this.children.messageInput as Input).getValue());
          (this.children.messageInput as Input).setValue('')
    })
  }

  componentDidUpdate(_: Props, newProps: Props) {
    this.children.addUser = new ChatManager({ selectedChatId: this.props.selectedChatId });
    this.children.messages = this.createMessages(newProps.messages, newProps.userId);
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }

  private createMessages(messages: any[], userId: number) {
    console.log(messages);
    return messages.map(data => {
      return new Message({...data, isMine: userId === data.user_id });
    })
  }
}

const withState = withStore((state) => {
  const selectedChatId = state.selectedChatId;
  const chat = (state.chats || []).find((chat: Chat) => chat.id === selectedChatId);
  const userId = state.user.id;

  return ({
    userId,
    messages: state.messages?.[selectedChatId] || [],
    selectedChatId,
    chat,
  });
});

export const ChatCurrent = withState(ChatCurrentBase as typeof Block);
