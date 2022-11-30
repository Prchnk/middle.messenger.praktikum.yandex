import {InputObjNodes} from "../interfaces/interfaces";
import {ValidatorInput} from "./ValidatorInput";

export class ValidatorForm {
	private readonly selectorInputWrapper: string = '.input-control';
	private readonly selectorLabelText: string = '.input-label-text';
	private readonly selectorInput: string = '.input';
	private readonly selectorInputError: string = '.input-error';

	private inputObjNodesArr: InputObjNodes[] = [];
	private inputValidators: ValidatorInput[];

	constructor(parentNode: Element) {
		this.inputObjNodesArr = this.getInputAllObjNodesArr(parentNode);
	}

	public init() {
		this.initValidators();
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

	public getInputValidators() {
		return this.inputValidators;
	}
}
