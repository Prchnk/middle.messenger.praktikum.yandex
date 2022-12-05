import RegistrationTemplate from './registration.hbs';
import {render} from '../../block/render';
import {InputRegistration} from "../../components/input/input";
import {querySelector} from "../../helpers/helpers";
import {ValidatorForm} from "../../helpers/classes/ValidatorForm";


const FORM_DATA = {
	title: 'Данные пользователя',
	list: [
		{name: 'first_name', label: 'Ваше имя', type: 'text'},
		{name: 'second_name', label: 'Ваша фамилия', type: 'text'},
		{name: 'login', label: 'Логин', type: 'text'},
		{name: 'phone', label: 'Ваш телефон', type: 'text'},
		{name: 'email', label: 'Ваша почта', type: 'text'},
		{name: 'password', label: 'Придумайте пароль', type: 'password'},
		{name: 'display_name', label: 'Придумайте ник', type: 'text'},

	]
};
function renderHbs() {


	const outputNode = querySelector('#output');
	outputNode.innerHTML = RegistrationTemplate(FORM_DATA);

	const registrationFormNode: HTMLFormElement = querySelector('.form_registration', outputNode) as HTMLFormElement;

	const controlsNode = querySelector('.controls', registrationFormNode);
	FORM_DATA.list.forEach(props =>
		render(controlsNode, (new InputRegistration(props)))
	)

	const registrationValidatorForm = new ValidatorForm(registrationFormNode);
	registrationValidatorForm.init();
}

renderHbs();
