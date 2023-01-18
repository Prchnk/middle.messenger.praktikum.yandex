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
      to: '/sign-up'
    });
    this.children.profile = new Link({
      label: 'Профиль',
      to: '/settings'
    });
    this.children.chat = new Link({
      label: 'Чат',
      to: '/messenger'
    });
  }


  render() {
    return this.compile(template, {...this.props});
  }
}
