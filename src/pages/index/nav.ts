import Block from '../../block';
import template from './nav.hbs';
import { Link } from '../../components/link/link';

export class Nav extends Block {
  constructor() {
    super({});
  }

  init() {

    this.children.auth = new Link({
      label: 'Войти',
      to: '/auth/'
    });
    this.children.registration = new Link({
      label: 'Регистрация',
      to: '/registration/'
    });
    this.children.profile = new Link({
      label: 'Профиль',
      to: '/profile/'
    });
    this.children.chat = new Link({
      label: 'Чат',
      to: '/chat/'
    });
  }


  render() {
    return this.compile(template, {...this.props});
  }
}
