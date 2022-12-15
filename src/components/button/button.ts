import Block from '../../block';
import template from './button.hbs';
import './button.scss';

interface ButtonProps {
  type?: string;
  label: string;
  events: {
    click: () => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: 'button', ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

// import Block from "../../block";
// import Template from "./button.hbs";
//
// export class Button extends Block {
// 	constructor(props: {type: string, cssClasses: string[], htmlContent: string}) {
// 		// Создаём враппер DOM-элемент header
// 		super("div", {
// 			...props,
// 			cssClassesStr: props.cssClasses.join(' ')
// 		});
// 	}
//
// 	render() {
// 		let result = Template(this.props);
// 		return result;
// 	}
// }
