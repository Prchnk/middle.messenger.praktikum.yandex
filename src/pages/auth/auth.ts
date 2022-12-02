import AuthTemplate from './auth.hbs';
import {querySelector} from "../../helpers/helpers";
import {ValidatorForm} from "../../helpers/classes/ValidatorForm";
import {render} from "../../block/render";
import {InputRegistration} from "../../components/input/input";
import { Button } from '../../components/button/button';




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

	const injectedInputsNode = querySelector('.injectedInputs', outputNode);
	const authFormNode = querySelector('.form_auth', outputNode);
	const injectedBtnSubmitNode = querySelector('.injectedBtnSubmit', outputNode);

	data.list.forEach(props =>
		render(injectedInputsNode, (new InputRegistration(props)))
	)

	render(injectedBtnSubmitNode, (new Button({
		type: 'submit',
		cssClasses: ['btn', 'btn_submit'],
		htmlContent: 'Авторизоваться'
	})));

	const authValidatorForm = new ValidatorForm(authFormNode);
	authValidatorForm.init();
}


renderHbs();
