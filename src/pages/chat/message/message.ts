import Block from '../../../block';
import template from './message.hbs';
import './message.scss'

interface MessageProps {
  content: string;
  isMine: boolean;
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    console.log(this.props)
    return this.compile(template, { ...this.props });
  }
}
