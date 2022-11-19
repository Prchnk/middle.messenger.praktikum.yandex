import ProfileTemplate from './profile.hbs';
import {getTargetElement} from "../../helpers";
import {ProfileItemChildNodes} from "./types";

function renderHbs() {
	const data = {
		title: 'Данные пользователя',
		list: [
			{name: 'first_name'},
			{name: 'second_name'},
			{name: 'display_name'},
			{name: 'login'},
			{name: 'phone'},
			{name: 'password'},
			{name: 'email'},
		]
	};
	document.querySelector('#output')!.innerHTML = ProfileTemplate(data);
}

class LogicProfileForm {
	profileItemNodes: Element[];
	profileItemObjects: Array<ProfileItemChildNodes>
	constructor() {
		this.onInit();
	}

	onInit() {
		this.initVars();
		this.initEventListeners();
	}

	initVars() {
		this.profileItemNodes = Array.from(document.querySelectorAll('[data-type=form-profile-item]'));
		this.profileItemObjects = this.profileItemNodes.map(this.getProfileItemChildNodes);
	}

	initEventListeners() {
		for (const profileItemObj of this.profileItemObjects) {
			profileItemObj.formItemEditBtnNode.addEventListener('click', this.editBtnHandlerCLick);
			profileItemObj.formItemSaveBtnNode.addEventListener('click', this.saveBtnHandlerCLick);
			profileItemObj.formItemInfoTextNode.addEventListener('dblclick', this.infoTextHandlerDblClick);
		}
	}

	infoTextHandlerDblClick = (event: MouseEvent) => {
		const targetNode = getTargetElement(event);
		const formItemNode: HTMLElement = targetNode!.closest('[data-type=form-profile-item]')!;
		const profileItemObj = this.getProfileItemChildNodes(formItemNode);
		const formItemValue = formItemNode!.getAttribute('data-value')!;

		formItemNode!.classList.add('form-profile__item_active');
		profileItemObj.formItemInputNode.value = formItemValue;
	};

	saveBtnHandlerCLick = (event: MouseEvent) => {
		const targetNode = getTargetElement(event);
		const formItemNode: HTMLElement = targetNode.closest('[data-type=form-profile-item]')!;
		const profileItemObj = this.getProfileItemChildNodes(formItemNode);
		const currentInputValue = profileItemObj.formItemInputNode.value;

		formItemNode!.setAttribute('data-value', currentInputValue);
		profileItemObj.formItemInfoTextNode.innerText = currentInputValue;
		formItemNode!.classList.remove('form-profile__item_active');
	};

	editBtnHandlerCLick = (event: MouseEvent) => {
		const targetNode = getTargetElement(event);
		const formItemNode: HTMLElement = targetNode.closest('[data-type=form-profile-item]')!;
		const profileItemObj = this.getProfileItemChildNodes(formItemNode);
		const formItemValue = formItemNode.getAttribute('data-value')!;

		formItemNode.classList.add('form-profile__item_active');
		profileItemObj.formItemInputNode.value = formItemValue;
	};

	getProfileItemChildNodes(formItemNode: HTMLElement): ProfileItemChildNodes {
		return {
			formItemNode: formItemNode,
			formItemInfoNode: formItemNode.querySelector('[data-type=form-profile-item-info]')!,
			formItemInfoTextNode: formItemNode.querySelector('[data-type=form-profile-item-info-text]')!,
			formItemInputWrapperNode: formItemNode.querySelector('[data-type=form-profile-input-wrapper]')!,
			formItemInputNode: formItemNode.querySelector('[data-type=form-profile-input]')!,
			formItemSaveBtnNode: formItemNode.querySelector('[data-type=form-profile-save-btn]')!,
			formItemEditBtnNode: formItemNode.querySelector('[data-type=form-profile-edit-btn]')!
		};
	}

	getAllFormValues() {
		return this.profileItemObjects.map(profileItemObj => {
			const inputName = profileItemObj.formItemNode.getAttribute('data-input-name');
			const inputValue = profileItemObj.formItemNode.getAttribute('data-value');

			return {
				name: inputName,
				value: inputValue
			};
		});
	}
}



renderHbs();
new LogicProfileForm();
