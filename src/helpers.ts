export const DOCUMENT: Document = document;

export function getTargetElement(event: Event): HTMLElement {
	return event.target as HTMLElement;
}
