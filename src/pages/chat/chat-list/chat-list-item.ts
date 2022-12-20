import Block from '../../../block';
import template from './chat-list-item.hbs';
import './chat-list-item.scss';

export class ChatListItem extends Block {
  render() {
    return this.compile(template, this.props);
  }
}


