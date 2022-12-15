import Block from "../../block";
import Template from "./button.hbs";

export class Button extends Block {
	constructor(props: {type: string, cssClasses: string[], htmlContent: string}) {
		// Создаём враппер DOM-элемент header
		super("div", {
			...props,
			cssClassesStr: props.cssClasses.join(' ')
		});
	}

	render() {
		let result = Template(this.props);
		return result;
	}
}
