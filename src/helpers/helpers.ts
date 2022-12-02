export const DOCUMENT: Document = document;

export function getTargetElement(event: Event): HTMLElement {
	return event.target as HTMLElement;
}

export function querySelector(selectors: string, parentNode: Element | null = null) {
	let nodeOrNull = null;

	if (parentNode === null) {
		nodeOrNull = DOCUMENT.querySelector(selectors);
	} else if (parentNode instanceof Element) {
		nodeOrNull = parentNode.querySelector(selectors);
	}

	if (nodeOrNull === null) {
		throw new Error(`${selectors} не найден в дереве`);
	}

	return nodeOrNull;
}
