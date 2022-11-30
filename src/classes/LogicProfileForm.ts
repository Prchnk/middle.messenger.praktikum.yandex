import { getTargetElement } from "../helpers/helpers";
import { ProfileItemChildNodes } from "../interfaces/interfaces";

export class LogicProfileForm {
	private profileItemNodes: Element[] = [];
	private profileItemObjects: ProfileItemChildNodes[] = [];
	private parentNode: Element;
	private readonly selectorFormProfileItem = '[data-type=form-profile-item]';
	private readonly selectorFormProfileItemInfo = '[data-type=form-profile-item-info]';
	private readonly selectorFormProfileItemInfoText = '[data-type=form-profile-item-info-text]';
	private readonly selectorFormProfileInputWrapper = '[data-type=form-profile-input-wrapper]';
	private readonly selectorFormProfileInput = '.input';
	private readonly selectorFormProfileSaveBtn = '[data-type=form-profile-save-btn]';
	private readonly selectorFormProfileEditBtn = '[data-type=form-profile-edit-btn]';
	private readonly activeClassFormProfileItem = 'form-profile__item_active';


	constructor(parentNode: Element) {
		this.parentNode = parentNode;
		this.onInit();
	}

	private onInit() {
		this.initVars();
		this.initEventListeners();
	}

	private initVars() {
		this.profileItemNodes = Array.from(this.parentNode.querySelectorAll(this.selectorFormProfileItem));
		this.profileItemObjects = this.profileItemNodes.map(this.getProfileItemChildNodes);
	}

	private initEventListeners() {
		for (const profileItemObj of this.profileItemObjects) {
			profileItemObj.formItemEditBtnNode.addEventListener('click', this.editBtnHandlerCLick);
			profileItemObj.formItemSaveBtnNode.addEventListener('click', this.saveBtnHandlerCLick);
			profileItemObj.formItemInfoTextNode.addEventListener('dblclick', this.infoTextHandlerDblClick);
		}
	}

	private infoTextHandlerDblClick = (event: MouseEvent) => {
		const targetNode = getTargetElement(event);
		const formItemNode: HTMLElement = targetNode!.closest(this.selectorFormProfileItem)!;
		const profileItemObj = this.getProfileItemChildNodes(formItemNode);
		const formItemValue = formItemNode!.getAttribute('data-value')!;

		formItemNode!.classList.add(this.activeClassFormProfileItem);
		profileItemObj.formItemInputNode.value = formItemValue;
	};

	private saveBtnHandlerCLick = (event: MouseEvent) => {
		const targetNode = getTargetElement(event);
		const formItemNode: HTMLElement = targetNode.closest(this.selectorFormProfileItem)!;
		const profileItemObj = this.getProfileItemChildNodes(formItemNode);
		const currentInputValue = profileItemObj.formItemInputNode.value;

		formItemNode!.setAttribute('data-value', currentInputValue);
		profileItemObj.formItemInfoTextNode.innerText = currentInputValue;
		formItemNode!.classList.remove(this.activeClassFormProfileItem);
	};

	private editBtnHandlerCLick = (event: MouseEvent) => {
		const targetNode = getTargetElement(event);
		const formItemNode: HTMLElement = targetNode.closest(this.selectorFormProfileItem)!;
		const profileItemObj = this.getProfileItemChildNodes(formItemNode);
		const formItemValue = formItemNode.getAttribute('data-value')!;

		formItemNode.classList.add(this.activeClassFormProfileItem);
		profileItemObj.formItemInputNode.value = formItemValue;
	};

	private getProfileItemChildNodes = (formItemNode: HTMLElement): ProfileItemChildNodes => {
		return {
			formItemNode: formItemNode,
			formItemInfoNode: formItemNode.querySelector(this.selectorFormProfileItemInfo)!,
			formItemInfoTextNode: formItemNode.querySelector(this.selectorFormProfileItemInfoText)!,
			formItemInputWrapperNode: formItemNode.querySelector(this.selectorFormProfileInputWrapper)!,
			formItemInputNode: formItemNode.querySelector(this.selectorFormProfileInput)!,
			formItemSaveBtnNode: formItemNode.querySelector(this.selectorFormProfileSaveBtn)!,
			formItemEditBtnNode: formItemNode.querySelector(this.selectorFormProfileEditBtn)!
		};
	}

	public getAllFormValues() {
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
