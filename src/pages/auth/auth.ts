import AuthTemplate from './auth.hbs';
import {querySelector} from "../../helpers/helpers";
import {ValidatorForm} from "../../classes/ValidatorForm";
import {render} from "../../block/render";
import {InputRegistration} from "../../components/input/input";




function renderHbs() {
	const data = {
		title: 'Авторизация пользователя',
		list: [
			{name: 'login', label: 'Логин', type: 'text'},
			{name: 'password', label: 'Пароль', type: 'password'},
		],
	};

	const outputNode =  querySelector('#output');
	outputNode.innerHTML = AuthTemplate(data);

	const authFormNode = querySelector('.form_auth', outputNode);

	data.list.forEach(props =>
		render(authFormNode, (new InputRegistration(props)))
	)

	const authValidatorForm = new ValidatorForm(authFormNode);
	authValidatorForm.init();
}


renderHbs();
