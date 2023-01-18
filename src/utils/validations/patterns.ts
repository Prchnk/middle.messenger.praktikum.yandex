export const FIRST_NAME = /^[A-zА-яЁё]{2,}$/;
export const FIRST_NAME_ERROR = 'От 2 символов, латиница или кириллица.';

export const SECOND_NAME = FIRST_NAME;
export const SECOND_NAME_ERROR = FIRST_NAME_ERROR;

export const DISPLAY_NAME = FIRST_NAME;
export const DISPLAY_NAME_ERROR = FIRST_NAME_ERROR;

export const EMAIL = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const EMAIL_ERROR = 'Невалидный email';

export const PHONE = /^\+[0-9]{10,15}$/;
export const PHONE_ERROR = 'Укажите номер с "+" от 10 до 15 цифр';

export const LOGIN = /^[a-zA-Z0-9\-]{3,20}$/;
export const LOGIN_ERROR = 'От 3 до 20 символов, латиница, может содержать цифры и дефис.';

export const PASSWORD = (value: string) => {
  return /\d/.test(value)
    && /[A-Z]/.test(value)
    && /^.{8,40}$/.test(value);
};
export const PASSWORD_ERROR = 'От 8 до 40 символов, латиница, 1 большая буква и 1 цифра';