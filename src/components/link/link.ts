import Block from '../../block/index';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import template from './link.hbs';
import './link.scss';


interface LinkProps extends PropsWithRouter {
  to: string;
  label: string;
  events?: {
    click: (event: MouseEvent) => void;
  };
}

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();
          this.navigate();
        }
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props});
  }
}

export const Link = withRouter(BaseLink);
