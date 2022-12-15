import { EventEmitter } from "./EventEmitter";

export class InputEventEmitter<T> extends EventEmitter {
	private typeEvent = 'input';

	constructor() {
		super();
	}

	public emit(data: T) {
		this._emit(this.typeEvent, data);
	}

	public subscribe(fn: (data: T) => void) {
		this._subscribe(this.typeEvent, fn);
	}


}
