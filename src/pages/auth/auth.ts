import AuthTemplate from './auth.hbs';
import {DOCUMENT} from "../../helpers";


function renderHbs() {
	const data = {
		title: 'Авторизация пользователя',
		list: [
			{name: 'login', label: 'Логин', type: 'text'},
			{name: 'password', label: 'Логин', type: 'password'},
		],
	};
	DOCUMENT.querySelector('#output')!.innerHTML = AuthTemplate(data);
}

renderHbs()
