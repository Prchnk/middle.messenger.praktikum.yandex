import ProfileTemplate from './profile.hbs';

function renderHbs() {
  const data = {
    title: 'Данные пользователя',
    list: [
      { name: 'first_name' },
      { name: 'second_name' },
      { name: 'display_name' },
      { name: 'login' },
      { name: 'phone' },
      { name: 'password' },
      { name: 'email' },
    ],
  };
  document.querySelector('#output').innerHTML = ProfileTemplate(data);
}

class LogicProfileForm {
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
    this.profileItemObjects.forEach((profileItemObj) => {
      profileItemObj.formItemEditBtnNode.addEventListener('click', (event) => this.editBtnHandlerCLick(event));
      profileItemObj.formItemSaveBtnNode.addEventListener('click', (event) => this.saveBtnHandlerCLick(event));
      profileItemObj.formItemInfoTextNode.addEventListener('dblclick', (event) => this.infoTextHandlerDblClick(event));
    });
  }

  infoTextHandlerDblClick(event) {
    const targetNode = event.target;
    const formItemNode = targetNode.closest('[data-type=form-profile-item]');
    const profileItemObj = this.getProfileItemChildNodes(formItemNode);
    const formItemValue = formItemNode.getAttribute('data-value');

    formItemNode.classList.add('form-profile__item_active');
    profileItemObj.formItemInputNode.value = formItemValue;
  }

  saveBtnHandlerCLick(event) {
    const targetNode = event.target;
    const formItemNode = targetNode.closest('[data-type=form-profile-item]');
    const profileItemObj = this.getProfileItemChildNodes(formItemNode);
    const currentInputValue = profileItemObj.formItemInputNode.value;

    formItemNode.setAttribute('data-value', currentInputValue);
    profileItemObj.formItemInfoTextNode.innerText = currentInputValue;
    formItemNode.classList.remove('form-profile__item_active');
  }

  editBtnHandlerCLick(event) {
    const targetNode = event.target;
    const formItemNode = targetNode.closest('[data-type=form-profile-item]');
    const profileItemObj = this.getProfileItemChildNodes(formItemNode);
    const formItemValue = formItemNode.getAttribute('data-value');

    formItemNode.classList.add('form-profile__item_active');
    profileItemObj.formItemInputNode.value = formItemValue;
  }

  getProfileItemChildNodes(formItemNode) {
    return {
      formItemNode,
      formItemInfoNode: formItemNode.querySelector('[data-type=form-profile-item-info]'),
      formItemInfoTextNode: formItemNode.querySelector('[data-type=form-profile-item-info-text]'),
      formItemInputWrapperNode: formItemNode.querySelector('[data-type=form-profile-input-wrapper]'),
      formItemInputNode: formItemNode.querySelector('[data-type=form-profile-input]'),
      formItemSaveBtnNode: formItemNode.querySelector('[data-type=form-profile-save-btn]'),
      formItemEditBtnNode: formItemNode.querySelector('[data-type=form-profile-edit-btn]'),
    };
  }

  getAllFormValues() {
    return this.profileItemObjects.map((profileItemObj) => {
      const inputName = profileItemObj.formItemNode.getAttribute('data-input-name');
      const inputValue = profileItemObj.formItemNode.getAttribute('data-value');

      return {
        name: inputName,
        value: inputValue,
      };
    });
  }
}

renderHbs();
LogicProfileForm();
