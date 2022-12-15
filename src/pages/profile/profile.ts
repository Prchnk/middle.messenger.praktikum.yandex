import Block from '../../block';
import template from './profile.hbs';
import { withStore } from '../../utils/store';
import AuthController from '../../controllers/AuthController';
import { Button } from '../../components/button/button';
import './profile.scss';

class ProfilePageBase extends Block {
  init() {
    AuthController.fetchUser();

    this.children.button = new Button({
      label: 'Выйти',
      events: {
        click: () => {
          AuthController.logout();
        }
      }
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }))

export const ProfilePage = withUser(ProfilePageBase);



// import ProfileTemplate from './profile.hbs';
// import {querySelector} from "../../helpers/helpers";
// import {render} from "../../block/render";
// import {InputRegistration} from "../../components/input/input";
// import {ValidatorForm} from "../../helpers/classes/ValidatorForm";
// import { LogicProfileForm } from '../../helpers/classes/LogicProfileForm';
//
// function renderHbs() {
// 	const data = {
// 		title: 'Данные пользователя',
// 		list: [
// 			{name: 'first_name', type: 'text', label: ''},
// 			{name: 'second_name', type: 'text', label: ''},
// 			{name: 'display_name', type: 'text', label: ''},
// 			{name: 'login', type: 'text', label: ''},
// 			{name: 'phone', type: 'text', label: ''},
// 			{name: 'password', type: 'password', label: ''},
// 			{name: 'email', type: 'text', label: ''},
// 		]
// 	};
// 	const outputNode =  querySelector('#output');
// 	outputNode.innerHTML = ProfileTemplate(data);
// 	const profileFormNode: HTMLFormElement = querySelector('.form-profile', outputNode) as HTMLFormElement;
// 	const injectInputComponentNodes = outputNode.querySelectorAll('.injectInputComponent');
//
// 	data.list.forEach((props, i) => {
// 		if (injectInputComponentNodes[i] !== undefined) {
// 			render(injectInputComponentNodes[i], (new InputRegistration(props)));
// 		}
// 	});
//
// 	const profileValidatorForm = new ValidatorForm(profileFormNode);
// 	profileValidatorForm.init();
// 	new LogicProfileForm(outputNode);
// }
//
//
//
// renderHbs();
//
