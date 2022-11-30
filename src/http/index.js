const METHODS = {
	GET: 'GET',
	PUT: 'PUT',
	POST: 'POST',
	DELETE: 'DELETE',
};

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data) {
	console.log('queryStringify', data)
	let pairs = Object.keys(data).map((key) => {
		let value = data[key];
		if (Array.isArray(value)) {
			value = value.join(',')
		}
		return key + '=' + value;
	})
	let result = pairs.join('&');
	return '?' + result;
}

class HTTPTransport {
	get(url, options = {}) {

		return this.request(url, {...options, method: METHODS.GET}, options.timeout);
	}
	put(url, options = {}) {
		return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
	}
	delete(url, options = {}) {
		return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
	}
	post(url, options = {}) {
		return this.request(url, {...options, method: METHODS.POST}, options.timeout);
	}


	// PUT, POST, DELETE

	// options:
	// headers — obj
	// data — obj
	request(url, options, timeout = 5000) {
		return new Promise((resolve, reject)=> {
			let xhr = new XMLHttpRequest();
			let sendUrl = '';
			if (options.method === METHODS.GET && options.data ) {
				sendUrl = url + queryStringify(options.data)
			} else {
				sendUrl = url
			}
			xhr.open(options.method, sendUrl, true);
			xhr.timeout = timeout;
			console.log('headers', options.headers)
			Object.keys(options.headers || {}).forEach((elem)=> {
				xhr.setRequestHeader(elem, options.headers[elem]);
			})
			let body;
			if (options.method !== METHODS.GET) {
				body = JSON.stringify(options.data)
			}

			xhr.send(body);
			xhr.onload = function() {
				//if (xhr.status === 200) {
				resolve(xhr)
				//}
				//else {reject()}
			};
			xhr.ontimeout = function () {
				reject('timeout')
			}
			xhr.onerror = function () {
				reject('error')
			}
			xhr.onabort = function() {
				reject('abort');
			}

		});

	}
}
