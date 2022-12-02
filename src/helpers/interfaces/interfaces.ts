export interface ConformityFn {
	createObjConformityArr: () => ObjConformityValidatorFuncs[];
}

export interface InputObjNodes {
	inputLabelTextNode: HTMLLabelElement;
	inputNode: HTMLInputElement;
	inputErrorNode: HTMLSpanElement;
	inputWrapperNode: Element;
}

export interface ObjConformityValidatorFuncs {
	name: string;
	validatorFns: (() => void)[];
}

export interface ErrorInput {
	errorTextArr: string[];
	typeInput: string;
}

export interface ProfileItemChildNodes {
	formItemNode: HTMLElement;
	formItemInfoNode: HTMLElement;
	formItemInfoTextNode: HTMLElement;
	formItemInputWrapperNode: HTMLElement;
	formItemInputNode: HTMLInputElement;
	formItemSaveBtnNode: HTMLButtonElement;
	formItemEditBtnNode: HTMLButtonElement;
}
