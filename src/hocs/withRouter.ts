import Block from '../block/index';
import Router from '../utils/router';

export function withRouter(Component: typeof Block<any>) {
  type Props = typeof Component extends Block<infer P> ? P : any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  }
}

export interface PropsWithRouter {
  router: typeof Router;
}
