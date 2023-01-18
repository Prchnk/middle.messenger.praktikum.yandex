import Block from '../../block';
import template from './form.hbs';

interface FormProps {
  events: {
    submit: (event: SubmitEvent) => void;
  };
  classes?: string;
  children: {
    controls: Block[];
  };
}

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
