import { EventBus } from "../utils/eventBus";
import { nanoid } from 'nanoid';

// Нельзя создавать экземпляр данного класса
class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  } as const;

  public id = nanoid(6);
  protected props: P;
  public children: Record<string, Block>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;


  constructor(propsWithChildren: P) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block>} {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  _addEvents() {
    const {events = {}} = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: P) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target }

        target[prop as keyof P] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }
}

export default Block;



// import { EventBus } from '../utils/eventBus';
//
// type BlockEvents<P = any> = {
// 	init: [];
// 	'flow:component-did-mount': [];
// 	'flow:component-did-update': [P, P];
// 	'flow:render': [];
// }
//
// type Props<P extends Record<string, unknown> = any> = { events?: Record<string, () => void> } & P;
//
// // Нельзя создавать экземпляр данного класса
// class Block<P extends Record<string, unknown> = any> {
// 	static EVENTS = {
// 		INIT: 'init',
// 		FLOW_CDM: 'flow:component-did-mount',
// 		FLOW_CDU: 'flow:component-did-update',
// 		FLOW_RENDER: 'flow:render'
// 	} as const;
//
// 	protected props: Props<P>;
// 	public children: Record<string, Block>;
// 	public id: number = Date.now() + Math.floor(Math.random() * 1000);
// 	private eventBus: () => EventBus<BlockEvents<Props<P>>>;
// 	private _element: HTMLElement | null = null;
// 	private _meta: { tagName: string; props: any; };
//
// 	protected constructor(tagName = 'div', propsWithChildren: Props<P> = {} as Props<P>) {
// 		const eventBus = new EventBus<BlockEvents<Props<P>>>();
//
// 		const {props, children} = this._getChildrenAndProps(propsWithChildren);
//
// 		this._meta = {
// 			tagName,
// 			props
// 		};
//
// 		this.children = children;
// 		this.props = this._makePropsProxy(props);
//
// 		this.eventBus = () => eventBus;
//
// 		this._registerEvents(eventBus);
//
// 		eventBus.emit(Block.EVENTS.INIT);
// 	}
//
// 	_getChildrenAndProps(childrenAndProps: Props<P>): { props: Props<P>, children: Record<string, Block> } {
// 		const props = {} as Record<string, unknown>;
// 		const children: Record<string, Block> = {};
//
// 		Object.entries(childrenAndProps).forEach(([key, value]) => {
// 			if (value instanceof Block) {
// 				children[key] = value;
// 			} else {
// 				props[key] = value;
// 			}
// 		});
//
// 		return {props: props as Props<P>, children};
// 	}
//
// 	_addEvents() {
// 		const {events = {}} = this.props;
//
// 		Object.keys(events).forEach(eventName => {
// 			this._element?.addEventListener(eventName, events[eventName]);
// 		});
// 	}
//
// 	_registerEvents(eventBus: EventBus<BlockEvents>) {
// 		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
// 		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
// 		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
// 		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
// 	}
//
// 	_createResources() {
// 		const {tagName} = this._meta;
// 		this._element = this._createDocumentElement(tagName);
// 	}
//
// 	private _init() {
// 		this._createResources();
//
// 		this.init();
//
// 		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
// 	}
//
// 	protected init() {};
//
// 	_componentDidMount() {
// 		this.componentDidMount();
// 	}
//
// 	componentDidMount() {
// 	}
//
// 	public dispatchComponentDidMount() {
// 		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
//
// 		Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
// 	}
//
// 	private _componentDidUpdate(oldProps: Props<P>, newProps: Props<P>) {
// 		if (this.componentDidUpdate(oldProps, newProps)) {
// 			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
// 		}
// 	}
//
// 	protected componentDidUpdate(oldProps: Props<P>, newProps: Props<P>): boolean;
// 	protected componentDidUpdate() {
// 		return true;
// 	}
//
// 	setProps = (nextProps: Partial<Props<P>>) => {
// 		if (!nextProps) {
// 			return;
// 		}
//
// 		Object.assign(this.props, nextProps);
// 	};
//
// 	get element() {
// 		return this._element!;
// 	}
//
// 	_render() {
// 		const block = this.render();
// 		// Это небезопасный метод для упрощения логики
// 		// Используйте шаблонизатор из npm или напишите свой безопасный
// 		// Нужно компилировать не в строку (или делать это правильно),
// 		// либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
// 		this._element!.innerHTML = block;
// 	}
//
// 	protected compile(template: (context: any) => string, context: any) {
// 		const contextAndStubs = {...context};
//
// 		Object.entries(this.children).forEach(([name, component]) => {
// 			contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
// 		});
//
// 		const html = template(contextAndStubs);
//
// 		const temp = document.createElement('template');
//
// 		temp.innerHTML = html;
//
// 		Object.entries(this.children).forEach(([_, component]) => {
// 			const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
//
// 			if (!stub) {
// 				return;
// 			}
//
// 			component.getContent()?.append(...Array.from(stub.childNodes));
//
// 			stub.replaceWith(component.getContent()!);
//
// 		});
//
// 		return temp.content;
// 	}
//
// 	protected render(): string {
// 		return '';
// 	}
//
// 	getContent() {
// 		return this.element;
// 	}
//
// 	_makePropsProxy(props: Props<P>) {
// 		// Ещё один способ передачи this, но он больше не применяется с приходом ES6+
// 		const self = this;
//
// 		return new Proxy(props, {
// 			get(target, prop) {
// 				const value = target[prop as string];
// 				return typeof value === 'function' ? value.bind(target) : value;
// 			},
// 			set(target, prop, value) {
// 				const oldTarget = {...target}
//
// 				target[prop as keyof Props<P>] = value;
//
// 				// Запускаем обновление компоненты
// 				// Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
// 				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
//
// 				return true;
// 			},
// 			deleteProperty() {
// 				throw new Error('Нет доступа');
// 			}
// 		});
// 	}
//
// 	_createDocumentElement(tagName: string) {
// 		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
// 		return document.createElement(tagName);
// 	}
//
// 	show() {
// 		this.getContent()!.style.display = 'block';
// 	}
//
// 	hide() {
// 		this.getContent()!.style.display = 'none';
// 	}
// }
//
// export default Block;
