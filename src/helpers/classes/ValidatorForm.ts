import { querySelector } from "../helpers";
import {InputObjNodes} from "../interfaces/interfaces";
import {ValidatorInput} from "./ValidatorInput";

export class ValidatorForm {
	private readonly selectorInputWrapper: string = '.input-control';
	private readonly selectorLabelText: string = '.input-label-text';
	private readonly selectorInput: string = '.input';
	private readonly selectorInputError: string = '.input-error';

	private inputObjNodesArr: InputObjNodes[] = [];
	private inputValidators: ValidatorInput[];
	private btnSubmitNode: HTMLButtonElement;
	private parentNode: Element;

	constructor(parentNode: Element) {
		this.parentNode = parentNode;
		this.initVars();
	}

	private initVars() {
		this.inputObjNodesArr = this.getInputAllObjNodesArr(this.parentNode);
		this.btnSubmitNode = querySelector('button[type=submit]', this.parentNode) as HTMLButtonElement;
	}

	public init() {
		this.initValidators();
		this.initEventListeners();
		this.checkFormValidAndDisableBtnSubmit();
	}

	private disableBtnSubmit(bool: boolean): void {
		this.btnSubmitNode.disabled = bool;
	}

	private initEventListeners(): void {
		// поставить слушатель события на кнопку submit
		// поставить слушатель события на изменение в каком либо валидаторе
		// в валидаторе для input'ов необходимо реализовать событие, на которое можно подписаться здесь, событие срабатывает при взаимодействии с input'ом

		for (const inputValidator of this.inputValidators) {
			inputValidator.inputEventEmitter.subscribe(() => {
				this.checkFormValidAndDisableBtnSubmit();
			});
		}
	}

	private get validForm() {
		for (const inputValidator of this.inputValidators) {
			if (inputValidator.valid === false) {
				return false;
			}
		}

		return true;
		// const validValidatorsArr = this.inputValidators.
	}

	private checkFormValidAndDisableBtnSubmit() {
		const disabledSubmit = !this.validForm;
		this.disableBtnSubmit(disabledSubmit);
	}

	private getInputAllObjNodesArr(parentNode: Element): InputObjNodes[] {
		const inputWrapperNodes = Array.from(parentNode.querySelectorAll(this.selectorInputWrapper));

		return inputWrapperNodes.map(this.getInputObjNodes);
	}

	private getInputObjNodes = (inputWrapperNode: Element): InputObjNodes => {
		const inputLabelTextNode: HTMLLabelElement | null = inputWrapperNode.querySelector(this.selectorLabelText);
		const inputNode: HTMLInputElement | null = inputWrapperNode.querySelector(this.selectorInput);
		const inputErrorNode: HTMLSpanElement | null = inputWrapperNode.querySelector(this.selectorInputError);

		if (
			inputLabelTextNode === null ||
			inputNode === null ||
			inputErrorNode === null
		) {
			throw new Error(`Не найден элемент по селектору: ${this.selectorLabelText} или ${this.selectorInput} или ${this.selectorInputError}`);
		}

		return {
			inputLabelTextNode,
			inputNode,
			inputErrorNode,
			inputWrapperNode
		};
	}

	private initValidators(): void {
		this.inputValidators = this.inputObjNodesArr.map(inputObjNodes => (new ValidatorInput(inputObjNodes)));
	}



	// public getInputValidators() {
	// 	return this.inputValidators;
	// }
}
