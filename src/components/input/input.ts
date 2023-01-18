import Block from '../../block';
import template from './input.hbs';
import './input.scss';

export interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  events?: {
    change?: (event: InputEvent) => void;
    input?: (event: InputEvent) => void;
  };
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  public setValue(value: string) {
    return (this.element as HTMLInputElement).value = value;
  }

  public setFocus(): void {
    this.element?.focus();
  }

  componentDidMount() {
    console.log('input cdm', this.element);
    super.componentDidMount();
  }

  render() {
    return this.compile(template, {...this.props});
  }
}
