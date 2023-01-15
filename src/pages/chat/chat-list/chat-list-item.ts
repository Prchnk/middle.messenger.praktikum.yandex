import Block from '../../../block';
import { getAvatarSrc } from '../../../utils/avatar';
import template from './chat-list-item.hbs';
import './chat-list-item.scss';

export class ChatListItem extends Block {
  render() {
    return this.compile(template, {...this.props, avatarSrc: getAvatarSrc(this.props.avatar)});
  }
}
