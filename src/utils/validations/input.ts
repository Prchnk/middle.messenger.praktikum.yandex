import { Button } from "../../components/button/button";
import { InputMessage } from "../../components/input-message/input-message";

type OnInputOptions <TFieldName extends string> = {
  inputName: TFieldName;
  pattern: RegExp | ((value: string) => boolean);
  getInputMessage: () => InputMessage;
  getErrors: () => Record<TFieldName, boolean>;
  getButton: () => Button;
}

export const onInput = <TFieldName extends string>(options: OnInputOptions<TFieldName>) => {
  return (event: InputEvent) => {
    const { value } = event.target as HTMLInputElement;
    const hasError = typeof options.pattern === 'function'
      ? !options.pattern(value)
      : !options.pattern.test(value);
    options.getInputMessage().setProps({ isVisible: hasError });

    const errors = options.getErrors();
    errors[options.inputName] = hasError;

    const button = options.getButton();

    const isDisabled = Object.values(errors).some((hasError) => hasError);
    button.setProps({ isDisabled });
  };
};

export const getValidationErrorsInitial = <TFieldName extends string>(inputFieldName: Record<string, TFieldName>) =>
  Object.values(inputFieldName).reduce((acc, fieldName: TFieldName) => {
    acc[fieldName] = true;
    return acc;
  }, {} as Record<TFieldName, boolean>);
