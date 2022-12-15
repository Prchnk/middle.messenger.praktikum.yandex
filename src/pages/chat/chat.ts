import Block from '../../block';
import template from './chat.hbs';
import { withStore } from '../../utils/store';
import ChatController from "../../controllers/ChatController";
import {Button} from "../../components/button/button";
import {Input} from "../../components/input/input";
import './chat.scss';

class ChatPageBase extends Block {
  init() {
    ChatController.getChats();

    this.children.createButton = new Button({
      label: 'создать чат',
      type: 'button',
      events: {
        click: () => this.onSubmit()
      },
    });
    this.children.chatTitle = new Input({
      name: 'title',
      type: 'text',
      placeholder: 'Введите название'
    });

  }
   async onSubmit() {
    const data = {title: (this.children.chatTitle as Input).getValue()};
    await ChatController.createChat(data);
    await ChatController.getChats();
  }

  render() {
    console.log('render', this.props.chats);
    return this.compile(template, this.props);
  }
}

const withState = withStore((state) => {
  console.log(state);
  return ({chats: state.chats })
})


export const ChatPage = withState(ChatPageBase);

// import ChatTemplate from './chat.hbs';
// import {DOCUMENT} from "../../utils/helpers/helpers";
// import * as avatarSrc from '../../img/avatar.png';
//
// function renderHbs() {
// 	const data = {
// 		title: 'по идее это бокпанель',
// 		list: [
// 			{name: 'Твой друг', status: 'online', amount_message: 2, me: 'Оля', date: Date, avatarSrc},
// 		]
// 	};
// 	DOCUMENT.querySelector('#output')!.innerHTML = ChatTemplate(data);
// }
// renderHbs();
