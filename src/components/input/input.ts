import Block from '../../block';
import template from './input.hbs';
import './input.scss';

interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  events?: {
    change?: (event: InputEvent) => void;
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

  componentDidMount() {
    console.log('input cdm', this.element);
    super.componentDidMount();
  }

  render() {
    return this.compile(template, {...this.props});
  }
}
