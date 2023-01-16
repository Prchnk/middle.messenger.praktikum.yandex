import Block from '../../block';
import template from './button.hbs';
import './button.scss';
interface ButtonProps {
  type?: string;
  label: string;
  events?: {
    click: () => void;
  };
  classes?: string;
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: 'button', ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
