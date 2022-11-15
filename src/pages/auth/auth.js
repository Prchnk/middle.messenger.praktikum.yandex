import AuthTemplate from './auth.hbs';


function renderHbs() {
	const data = {
		title: 'Авторизация пользователя',
		list: [
			{name: 'login', label: 'Логин', type: 'text'},
			{name: 'password', label: 'Логин', type: 'password'},
		],
	};
	document.querySelector('#output').innerHTML = AuthTemplate(data);
}

renderHbs()
