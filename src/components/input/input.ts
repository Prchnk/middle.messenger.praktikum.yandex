// import Block from '../../block';
// import template from './input.hbs';
// import './input.scss';
//
// interface InputProps {
//   name: string;
//   type: string;
//   placeholder: string;
// }
//
// export class Input extends Block<InputProps> {
//   constructor(props: InputProps) {
//     super(props);
//   }
//
//   public setValue(value: string) {
//     return (this.element as HTMLInputElement).value = value;
//   }
//
//   public getName() {
//     return (this.element as HTMLInputElement).name;
//   }
//
//   public getValue() {
//     return (this.element as HTMLInputElement).value;
//   }
//
//   render() {
//     return this.compile(template, { ...this.props});
//   }
// }


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


// import Block from "../../block";
// import Template from "./input.hbs";
//
// export class InputRegistration  extends  Block {
// 	constructor(props: {type: string; name: string; label: string}) {
// 		// Создаём враппер DOM-элемент header
// 		super("div", props);
// 	}
//
// 	render() {
//
// 		let resalt = Template(this.props);
// 		return resalt;
// 	}
// }
