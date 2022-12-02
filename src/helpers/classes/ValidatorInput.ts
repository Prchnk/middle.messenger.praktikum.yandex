import { InputObjNodes, ObjConformityValidatorFuncs} from "../interfaces/interfaces";
import { InputEventEmitter } from "./InputEventEmitter";

export class ValidatorInput {

	private inputObjNodes: InputObjNodes;
	private typeInput: string;
	private validationFunc: (() => void) | null = null;
	private _existError: boolean = false;
	private _valid: boolean = false;
	private _arrErrors: string[] = [];

	private get value(): string {
		return this.inputObjNodes.inputNode.value;
	};

	public get arrErrors(): string[] {
		return this._arrErrors;
	}
	public get existError(): boolean {
		return this._existError;
	}

	public get valid(): boolean {
		return this._valid;
	}

	public inputEventEmitter = new InputEventEmitter<{node: HTMLInputElement, value: string}>();

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
		this.inputObjNodes.inputNode.addEventListener('input', this.onInput);
	}

	private onFocus = (): void => {
		this.onTouched();
	}

	private onBLur = (): void => {
		this.onTouched();
	}

	private onInput = (): void => {
		this.onTouched();

		this.inputEventEmitter.emit({
			node: this.inputObjNodes.inputNode,
			value: this.value
		});
	};

	private onTouched = (): void => {
		if (this.validationFunc === null) {
			return;
			// throw new Error('Валидация для этого элемента не создана');
		}



		this._arrErrors = [];

		this.validationFunc();

		if (this._arrErrors.length === 0) {
			this._existError = false;
		}

		if (this.existError === false) {
			this.clearErrorInBrowser();
		}

		this._valid = !this._existError;

		// this.inputChangeEmitter.emit('')
	};

	private clearErrorInBrowser(): void {
		this.inputObjNodes.inputErrorNode.classList.remove('input-error_active');
		this.inputObjNodes.inputErrorNode.textContent = '';
	}

	private createObjConformityArr(): ObjConformityValidatorFuncs[] {
		return [
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
	}

	private defineValidationFunc(): void {
		const objConformityArr = this.createObjConformityArr();

		const findedObjConformity = objConformityArr.find(objConformity => objConformity.name === this.typeInput);

		if (findedObjConformity === undefined) {
			return;
			// throw new Error(`В массиве объектов соответствий findedObjConformity не найден объект с полем name, равным ${this.typeInput}`);
		}

		this.validationFunc = () => {
			for (const validatorFn of findedObjConformity.validatorFns) {
				validatorFn();
			}
		};
	}

	private setError(errorText: string): void {
		this._existError = true;
		this.inputObjNodes.inputErrorNode.classList.add('input-error_active');
		this._arrErrors.push(errorText);

		const errorHtmlText = this._arrErrors.map(text => `<span>${text}</span>`).join('');
		this.inputObjNodes.inputErrorNode.innerHTML = errorHtmlText;
	}

	private validatorNameLogin = (): void => {
		const loginLetterPattern = new RegExp(/[a-zA-Z]/).test(this.value);

		if (!(this.value.length >= 3  && this.value.length <= 20 && loginLetterPattern) ) {
			this.setError('от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание');
		}
	}

	private validatorNamePassword = (): void => {
		const oneDigitExist: boolean = new RegExp(/[0-9]/).test(this.value);
		const oneCapitalLetterExist = new RegExp(/[A-ZА-ЯЁ]/).test(this.value);

		if (!(this.value.length > 8  && this.value.length < 40 && oneCapitalLetterExist && oneDigitExist) ) {
			this.setError('Допустимо от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра');
		}
	}

	private validatorNamePhone = (): void => {
		const phonePattern = this.value.match(/\+[0-9]{15,20}/);

		if (!phonePattern) {
			this.setError('должен состоять из цифр, может начинается с плюса, Допустимо от 15 до 20 символов');
		}

	}


	private validatorNameEmail = (): void => {
		const emailPattern = this.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);

		if (!emailPattern) {
			this.setError('латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.');
		}
	}

	private validatorFirstName = (): void => {
		const firstLetterCapitalExist = new RegExp(/[A-ZА-ЯЁ]/).test(this.value[0]);
		if (!firstLetterCapitalExist) {
			this.setError('латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)');
		}
	}

	private validatorSecondName = (): void => {
		const firstLetterCapitalExist = new RegExp(/[A-ZА-ЯЁ]/).test(this.value[0]);
		if (!firstLetterCapitalExist) {
			this.setError('латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)');
		}
	}

	private validatorNameMessage = (): void => {
		if (this.inputObjNodes.inputNode.value === '') {
			this.setError('Поле не может быть пустым');
		}
	}
}
