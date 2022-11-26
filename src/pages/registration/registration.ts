import RegistrationTemplate from './registration.hbs';
import {render} from '../../block/render';
import {InputRegistration} from "./input";

function renderHbs() {
	const data = {
		title: 'Данные пользователя',
		list: [
			{name: 'first_name', label: 'Ваше имя', type: 'text'},
			{name: 'second_name', label: 'Ваша фамилия', type: 'text'},
			{name: 'display_name', label: 'Придумайте ник', type: 'text'},
			{name: 'login', label: 'Логин', type: 'text'},
			{name: 'phone', label: 'Ваш телефон', type: 'number'},
			{name: 'email', label: 'Ваша почта', type: 'text'},
			{name: 'password', label: 'Придумайте пароль', type: 'password'},

		]
	};
	document.querySelector('#output')!.innerHTML = RegistrationTemplate(data);
	data.list.forEach((props) => {
		render('form', new InputRegistration(props))
	})
}

renderHbs();

