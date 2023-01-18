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
import { Form } from '../../../components/form/form';

interface Props {
  userId: number;
  messages: Message[];
  selectedChatId: number;
  chat: Chat;
}
class ChatCurrentBase extends Block<Props> {
  init() {
    const messageInput = new Input({
      type: 'text',
      name: 'userId',
      placeholder: 'введите сообщение',
    });
  
    const sendButton = new Button({
      label: 'отправить',
      type: 'submit',
      events: {
        click: () => {
  
        }
      },
      classes: 'send-button'
    });
  
    this.children.sendForm = new Form({
      classes: 'footer',
      events: {
        submit: (event) => {
          event.preventDefault();
          messagesController.sendMessage(this.props.selectedChatId, messageInput.getValue());
          messageInput.setValue('');
        },
      },
      children: {
        controls: [
          messageInput,
          sendButton,
        ],
      }
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
