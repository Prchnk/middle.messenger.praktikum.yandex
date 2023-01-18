import Block from '../../../block';
import template from './chat-manager.hbs';
import { Input } from '../../../components/input/input';
import { Button } from '../../../components/button/button';
import './chat-manager.scss';
import ChatController from '../../../controllers/ChatController';

export class ChatManager extends Block {
  init() {
    this.children.addInput = new Input({
      type: 'text',
      name: 'userId',
      placeholder: 'введите id юзера',
    });

    this.children.addButton = new Button({
      label: 'добавить юзера',
      type: 'button',
      events: {
        click: () => {
          const userId = parseInt((this.children.addInput as Input).getValue());

          ChatController.addUserToChat({
            chatId: this.props.selectedChatId,
            users: [userId]
          });
        },
      }
    });

    this.children.removeInput = new Input({
      type: 'text',
      name: 'userId',
      placeholder: 'введите id юзера',
    });

    this.children.removeButton = new Button({
      label: 'удалить юзера',
      type: 'button',
      events: {
        click: () => {
          const userId = parseInt((this.children.removeInput as Input).getValue());
          console.log(`remove user ${userId} from chat ${this.props.selectedChatId}`);

          ChatController.removeUserChat({
            chatId: this.props.selectedChatId,
            users: [userId]
          });
        },
      }
    });
  }

  componentDidUpdate() {
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
