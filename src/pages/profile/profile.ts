import ProfileTemplate from './profile.hbs';
import {querySelector} from "../../helpers/helpers";
import {render} from "../../block/render";
import {InputRegistration} from "../../components/input/input";
import {ValidatorForm} from "../../classes/ValidatorForm";
import { LogicProfileForm } from '../../classes/LogicProfileForm';

function renderHbs() {
	const data = {
		title: 'Данные пользователя',
		list: [
			{name: 'first_name', type: 'text', label: ''},
			{name: 'second_name', type: 'text', label: ''},
			{name: 'display_name', type: 'text', label: ''},
			{name: 'login', type: 'text', label: ''},
			{name: 'phone', type: 'text', label: ''},
			{name: 'password', type: 'password', label: ''},
			{name: 'email', type: 'text', label: ''},
		]
	};
	const outputNode =  querySelector('#output');
	outputNode.innerHTML = ProfileTemplate(data);
	const profileFormNode = querySelector('.form-profile', outputNode);
	const injectInputComponentNodes = outputNode.querySelectorAll('.injectInputComponent');

	data.list.forEach((props, i) => {
		if (injectInputComponentNodes[i] !== undefined) {
			render(injectInputComponentNodes[i], (new InputRegistration(props)));
		}
	});

	const profileValidatorForm = new ValidatorForm(profileFormNode);
	profileValidatorForm.init();
	new LogicProfileForm(outputNode);
}



renderHbs();

