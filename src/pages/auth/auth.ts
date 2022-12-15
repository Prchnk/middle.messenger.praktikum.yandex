import AuthTemplate from './auth.hbs';
import {querySelector} from "../../helpers/helpers";
import {ValidatorForm} from "../../helpers/classes/ValidatorForm";
import {render} from "../../block/render";
import {InputRegistration} from "../../components/input/input";
import {Button} from '../../components/button/button';


const FORM_DATA = {
  title: 'Авторизация пользователя',
  list: [
    {name: 'login', label: 'Логин', type: 'text'},
    {name: 'password', label: 'Пароль', type: 'password'},
  ],
};

function renderHbs() {
  const outputNode = querySelector('#output');
  outputNode.innerHTML = AuthTemplate(FORM_DATA);

  const injectedInputsNode = querySelector('.injectedInputs', outputNode);
  const authFormNode: HTMLFormElement = querySelector('.form_auth', outputNode) as HTMLFormElement;
  const injectedBtnSubmitNode = querySelector('.injectedBtnSubmit', outputNode);

  FORM_DATA.list.forEach(props =>
    render(injectedInputsNode, (new InputRegistration(props)))
  )

  render(injectedBtnSubmitNode, (new Button({
    type: 'submit',
    cssClasses: ['btn', 'btn-submit'],
    htmlContent: 'Авторизоваться'
  })));

  const authValidatorForm = new ValidatorForm(authFormNode);
  authValidatorForm.init();
}

renderHbs();
