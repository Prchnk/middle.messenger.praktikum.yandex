// @ts-ignore
import Block from "../../block";
import Template from "./input.hbs";
// @ts-ignore
export class InputRegistration  extends  Block {
	constructor(props: {type: string; name: string; label: string}) {
		// Создаём враппер DOM-элемент button
		super("div", props);
	}

	render() {
// @ts-ignore
// 		return Template(this.props);
		let resalt = Template(this.props);
		return resalt;
	}
}

