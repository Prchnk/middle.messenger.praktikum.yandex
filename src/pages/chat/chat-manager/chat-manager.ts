import Block from '../../../block';
import template from './chat-manager.hbs';
import { Input } from '../../../components/input/input';
import { Button } from '../../../components/button/button';
import './chat-manager.scss';
import ChatsUsersController from '../../../controllers/ChatsUsersController';

export class ChatManager extends Block {
  init() {
    this.children.addInput = new Input({
      type: 'text',
      name: 'userId',
      placeholder: 'User id',
    });

    this.children.addButton = new Button({
      label: 'Add',
      type: 'button',
      events: {
        click: () => {
          const userId = parseInt(this.children.addInput.getValue());
          console.log(`add user ${userId} to chat ${this.props.selectedChatId}`);

          ChatsUsersController.addUserChat({
            chatId: this.props.selectedChatId,
            users: [userId]
          });
        },
      }
    });

    this.children.removeInput = new Input({
      type: 'text',
      name: 'userId',
      placeholder: 'User id',
    });

    this.children.removeButton = new Button({
      label: 'Remove',
      type: 'button',
      events: {
        click: () => {
          const userId = parseInt(this.children.removeInput.getValue());
          console.log(`remove user ${userId} from chat ${this.props.selectedChatId}`);

          ChatsUsersController.removeUserChat({
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
