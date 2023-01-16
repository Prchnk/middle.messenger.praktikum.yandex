import Block from '../../block';
import { Input, InputProps } from '../input/input';
import template from './validate-input.hbs';
import './validate-input.scss';

interface ValidateInputProps extends InputProps {
  validator: {
    hasError?: boolean;
    fn: (value: string) => boolean;
    message: string;
    change: (data: { hasError: boolean }) => void;
  }
}

export class ValidateInput extends Block<ValidateInputProps> {
  constructor(props: ValidateInputProps) {
    super(props);
  }

  init() {
    this.children.input = new Input({
      ...this.props,
      events: {
        ...this.props.events,
        input: (event) => {
          const { value } = event.target as HTMLInputElement;

          // TODO call validator
          const hasError = !this.props.validator.fn(value ?? '');

          if (this.props.validator.hasError !== hasError) {
            console.log('value has error', hasError, value);
            // this.props.validator.hasError = hasError;
            this.setProps({ validator: {
              ...this.props.validator,
              hasError,
            }});
            this.props.validator.change({ hasError });
          }

          this.props.events?.input?.(event);
        }
      }
    });
  }

  // componentDidMount() {
  //   super.componentDidMount();
  // }

  // protected componentDidUpdate(_oldProps: ValidateInputProps, _newProps: ValidateInputProps): boolean {
  //   console.log('componentDidUpdate', _oldProps, _newProps);
  // }

  render() {
    return this.compile(template, {...this.props});
  }
}
