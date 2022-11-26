import AuthTemplate from './auth.hbs';
import {DOCUMENT} from "../../helpers";

interface InputObjNodes {
	inputLabelTextNode: HTMLLabelElement;
	inputNode: HTMLInputElement;
	inputErrorNode: HTMLSpanElement;
	inputWrapperNode: Element;
}

interface ObjConformityValidatorFuncs {
	name: string;
	validatorFns: (() => void)[];
}

interface ErrorInput {
	errorTextArr: string[];
	typeInput: string;
}

class ValidateInputs {
	private readonly selectorInputWrapper: string = '.input-control';
	private readonly selectorLabelText: string = '.input-label-text';
	private readonly selectorInput: string = '.input';
	private readonly selectorInputError: string = '.input-error';

	private inputObjNodesArr: InputObjNodes[] = [];
	private inputValidators: ValidatorInput[];

	constructor(parentNode: Element) {
		this.inputObjNodesArr = this.getInputAllObjNodesArr(parentNode);
		this.initValidators();
		// console.log(this.inputValidators);
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
		// this.inputValidators = [];
		//
		// for (const inputObjNodes of this.inputObjNodesArr) {
		// 	const instanceValidatorInput = new ValidatorInput(inputObjNodes);
		// 	this.inputValidators.push(instanceValidatorInput);
		// }

		this.inputValidators = this.inputObjNodesArr.map(inputObjNodes => (new ValidatorInput(inputObjNodes)));
	}
}

class ValidatorInput {
	private inputObjNodes: InputObjNodes;
	private typeInput: string;
	private validationFunc: (() => void) | null = null;
	private existError: boolean = false;
	private arrErrors: ErrorInput[] = [];

	constructor(inputObjNodes: InputObjNodes) {
		this.initVars(inputObjNodes);
		this.defineValidationFunc();
		this.initEventListeners();
	}

	private initVars(inputObjNodes: InputObjNodes): void {
		this.inputObjNodes = inputObjNodes;

		const typeInput = this.inputObjNodes.inputNode.getAttribute('name');

		if (typeInput === null) {
			throw new Error(`У какого-то input'а отсутствует атрибут name`);
		}

		this.typeInput = typeInput;
	}

	private initEventListeners(): void {
		this.inputObjNodes.inputNode.addEventListener('focus', this.onFocus);
		this.inputObjNodes.inputNode.addEventListener('blur', this.onBLur);
	}

	private onFocus = (): void => {
		if (this.validationFunc === null) {
			throw new Error('Валидация для этого элемента не создана');
		}

		const findedErrorIdx = this.arrErrors.findIndex(error => error.typeInput === this.typeInput);
		if (findedErrorIdx !== -1) { // если ошибка этого типа есть
			this.arrErrors[findedErrorIdx].errorTextArr = [];
		}
		// this.arrErrors
		this.validationFunc();

		if (this.existError === true) {
			this.inputObjNodes.inputErrorNode.classList.add('input-error_active');
		}
	}

	private onBLur = (): void => {
		this.inputObjNodes.inputErrorNode.classList.remove('input-error_active');
		this.inputObjNodes.inputErrorNode.textContent = '';
	}

	private defineValidationFunc(): void {
		const objConformityArr: ObjConformityValidatorFuncs[] = [
			{
				name: 'login',
				validatorFns: [this.validatorNameLogin]
			},
			{
				name: 'password',
				validatorFns: [this.validatorNamePassword]
			},
			{
				name: 'phone',
				validatorFns: [this.validatorNamePhone]
			},
			{
				name: 'email',
				validatorFns: [this.validatorNameEmail]
			},
			{
				name: 'first_name',
				validatorFns: [this.validatorFirstName]
			},
			{
				name: 'second_name',
				validatorFns: [this.validatorSecondName]
			},
			{
				name: 'message',
				validatorFns: [this.validatorNameMessage]
			}
		];

		const findedObjConformity = objConformityArr.find(objConformity => objConformity.name === this.typeInput);

		if (findedObjConformity === undefined) {
			throw new Error(`В массиве объектов соответствий findedObjConformity не найден объект с полем name, равным ${this.typeInput}`);
		}

		const validationFunc = () => {
			for (const validatorFn of findedObjConformity.validatorFns) {
				validatorFn();
			}
		};

		this.validationFunc = validationFunc;
	}

	private setError(errorText: string): void {
		this.existError = true;

		let currentError: ErrorInput; // объект текущей ошибки
		const findedLastError = this.arrErrors.find(error => error.typeInput === this.typeInput);

		if (findedLastError === undefined) { // если не нашли ошибку этого типа в массиве ошибок
			currentError = {
				errorTextArr: [errorText],
				typeInput: this.typeInput
			};
			this.arrErrors.push(currentError);
		} else {
			findedLastError.errorTextArr.push(errorText);
			currentError = findedLastError;
		}

		const errorHtmlText = currentError.errorTextArr.map(text => `<span>${text}</span>`).join('');
		this.inputObjNodes.inputErrorNode.innerHTML = errorHtmlText;
	}

	private validatorNameLogin = (): void => {
		if (this.inputObjNodes.inputNode.value === '') {
			this.setError('Поле не может быть пустым');
		}

		if (this.inputObjNodes.inputNode.value.length < 3 || this.inputObjNodes.inputNode.value.length > 20) {
			this.setError('Допустимо от 3 до 20 символов');
		}

		const loginPattern = this.inputObjNodes.inputNode.value.match(/^[a-zA-Z0-9]+$/)
		if (loginPattern !== loginPattern) {
			this.setError('Должен содержать a-zA-Z0-9 латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)');
		}
	}

	private validatorNamePassword = (): void => {
		if (this.inputObjNodes.inputNode.value.length < 8 || this.inputObjNodes.inputNode.value.length > 40) {
			this.setError('Допустимо от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра');
		}
	}

	private validatorNamePhone = (): void => {
		const phonePattern = this.inputObjNodes.inputNode.value.match(/^[ 0-9]+$/)
		if (phonePattern !== phonePattern) {
			this.setError('должен состоять из цифр, может начинается с плюса.');
		}
		if (this.inputObjNodes.inputNode.value.length < 15 || this.inputObjNodes.inputNode.value.length > 20) {
			this.setError('Допустимо от 15 до 20 символов');
		}
	}

	private validatorNameEmail = (): void => {
		const emailPattern = this.inputObjNodes.inputNode.value.match(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/)
		if (emailPattern !== emailPattern) {
			this.setError('латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.');
		}
	}

	private validatorFirstName = (): void => {
		const firstNPattern = this.inputObjNodes.inputNode.value.match(/^[а-яА-ЯёЁa-zA-Z]+$/)
		if (firstNPattern !== firstNPattern) {
			this.setError('латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)');
		}
	}

	private validatorSecondName = (): void => {
		const secondNPattern = this.inputObjNodes.inputNode.value.match(/^[а-яА-ЯёЁa-zA-Z]+$/)
		if (secondNPattern !== secondNPattern) {
			this.setError('латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)');
		}
	}

	private validatorNameMessage = (): void => {
		if (this.inputObjNodes.inputNode.value === '') {
			this.setError('Поле не может быть пустым');
		}
}
}

function renderHbs() {
	const data = {
		title: 'Авторизация пользователя',
		list: [
			{name: 'login', label: 'Логин', type: 'text'},
			{name: 'password', label: 'Пароль', type: 'password'},
		],
	};
	const outputNode: Element | null = DOCUMENT.querySelector('#output');

	if (outputNode === null) {
		throw new Error('#output не найден в дереве');
	}

	outputNode.innerHTML = AuthTemplate(data);
	const instanceValidateInputs = new ValidateInputs(outputNode);
}


renderHbs();
