import Block from './index';

export function render(query: string | Element, block: Block, type: 'append' | 'prepend' = 'append') {
	let root: Element | null = null;

	if (typeof query === 'string') {
		root = document.querySelector(query);
	} else if (query instanceof Element) {
		root = query;
	} else {
		throw new Error('query передан не строка и не Element');
	}

	if (root === null) {
		throw new Error(`элемент в дереве по селектору ${query} не найден`);
	}

	// Можно завязаться на реализации вашего класса Block
	if (type === 'append') {
		root.append(block.getContent());
	} else if (type === 'prepend') {
		root.prepend(block.getContent());
	}

	block.dispatchComponentDidMount();

	return root;
}
