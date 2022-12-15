import Block from "../../block";
import Template from "./input.hbs";

export class InputRegistration  extends  Block {
	constructor(props: {type: string; name: string; label: string}) {
		// Создаём враппер DOM-элемент header
		super("div", props);
	}

	render() {

		let resalt = Template(this.props);
		return resalt;
	}
}
