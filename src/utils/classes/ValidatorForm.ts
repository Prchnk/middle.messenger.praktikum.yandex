import {querySelector} from "../helpers";
import {FormControl, InputObjNodes} from "../interfaces/interfaces";
import {ValidatorInput} from "./ValidatorInput";

export class ValidatorForm {
  private readonly selectorInputWrapper: string = '.input-control';
  private readonly selectorLabelText: string = '.input-label-text';
  private readonly selectorInput: string = '.input';
  private readonly selectorInputError: string = '.input-error';

  private inputObjNodesArr: InputObjNodes[] = [];
  private inputValidators: ValidatorInput[];
  private btnSubmitNode: HTMLButtonElement;
  private formNode: HTMLFormElement;

  constructor(formNode: HTMLFormElement) {
    this.formNode = formNode;
    this.initVars();
  }

  private initVars() {
    this.inputObjNodesArr = this.getInputAllObjNodesArr(this.formNode);
    this.btnSubmitNode = querySelector('button[type=submit]', this.formNode) as HTMLButtonElement;
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

    for (const inputValidator of this.inputValidators) {
      inputValidator.inputEventEmitter.subscribe(() => {
        this.checkFormValidAndDisableBtnSubmit();
      });
    }

    this.formNode.addEventListener('submit', this.submitForm);
  }

  private submitForm = (event: SubmitEvent) => {
    event.preventDefault();

    if (this.validForm === true) {
      // что-то делать после отправки формы
      console.log(this.formValues);

    }
  };

  private get validForm(): boolean {
    for (const inputValidator of this.inputValidators) {
      if (!inputValidator.valid) {
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

  private getInputAllObjNodesArr(formNode: HTMLFormElement): InputObjNodes[] {
    const inputWrapperNodes = Array.from(formNode.querySelectorAll(this.selectorInputWrapper));

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

  private get formValues(): FormControl[] {
    return this.inputValidators.map(inputValidator => ({
      name: inputValidator.name,
      value: inputValidator.value,
      type: inputValidator.type
    }));
  }
}
