export class EventEmitter {
	private events: Record<string, ((data: any) => void)[]> = {};

	constructor() {
	}

	protected _subscribe<T>(eventName: string, fn: (data: T) => void) {
		if (this.events[eventName] === undefined) {
			this.events[eventName] = [];
		}

		this.events[eventName].push(fn);
	}

	protected _emit<T>(eventName: string, data: T) {
		const eventFnArr = this.events[eventName];

		if (eventFnArr !== undefined) {
			eventFnArr.forEach(fn => {
				fn.call(null, data);
			});
		}
	}
}
