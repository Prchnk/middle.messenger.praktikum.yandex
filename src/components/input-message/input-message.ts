import Block from '../../block';
import template from './input-message.hbs';
import './input-message.scss';

interface InputMessageProps {
  message: string;
  isVisible?: boolean;
}

export class InputMessage extends Block<InputMessageProps> {
  constructor(props: InputMessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props});
  }
}
