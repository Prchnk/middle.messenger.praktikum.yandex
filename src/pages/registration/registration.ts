import RegistrationTemplate from './registration.hbs';
import {render} from '../../block/render';
import {InputRegistration} from "../../components/input/input";
import {querySelector} from "../../helpers/helpers";
import {ValidatorForm} from "../../classes/ValidatorForm";
import {getFormValue} from "../../helpers/form";


const FORM_DATA = {
	title: 'Данные пользователя',
	list: [
		{name: 'first_name', label: 'Ваше имя', type: 'text'},
		{name: 'second_name', label: 'Ваша фамилия', type: 'text'},
		{name: 'login', label: 'Логин', type: 'text'},
		{name: 'phone', label: 'Ваш телефон', type: 'text'},
		{name: 'email', label: 'Ваша почта', type: 'text'},
		{name: 'password', label: 'Придумайте пароль', type: 'password'},
		// {name: 'display_name', label: 'Придумайте ник', type: 'text'},

	]
};
function renderHbs() {

	// document.querySelector('#output')!.innerHTML = RegistrationTemplate(data);


	const outputNode = querySelector('#output');
	outputNode.innerHTML = RegistrationTemplate(FORM_DATA);

	const registrationFormNode = querySelector('.form_registration', outputNode);
	let controlsNode = querySelector('.controls', registrationFormNode)
	FORM_DATA.list.forEach(props =>
		render(controlsNode, (new InputRegistration(props)))
	)

	const registrationValidatorForm = new ValidatorForm(registrationFormNode);
	registrationValidatorForm.init();
}
function addListeners(): void {
	let formNode = querySelector('.form_registration') as HTMLFormElement;
	formNode.addEventListener('submit', (event) => {
		event.preventDefault();

		let result = getFormValue(formNode, FORM_DATA.list);
		console.log(result);
	})
}
renderHbs();

addListeners()
	// data.list.forEach(props =>
	// 	render(RegistrationFormNode, (new InputRegistration(props)))
	// )

	// const registrationValidatorForm = new ValidatorForm(RegistrationFormNode);
	// registrationValidatorForm.init();



	// const outputNode: Element | null = DOCUMENT.querySelector('#output');
	//
	// if (outputNode === null) {
	// 	throw new Error('#output не найден в дереве');
	// }
	//
	// outputNode.innerHTML = RegistrationTemplate(data);
	//
	// const registrationFormNode = outputNode.querySelector('.form_registration');
	//
	// if (registrationFormNode === null) {
	// 	throw new Error('.form_auth не найден в дереве');
	// }
	//






	// data.list.forEach((props) => {
	// 	render('form', new InputRegistration(props))
	// })





