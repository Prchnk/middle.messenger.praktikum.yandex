export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete'
}

type Options = {
  method: Method;
  data?: any;
};

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(path = '/'): Promise<Response> {
    return this.request<Response>(this.endpoint + path);
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    });
  }

  public put<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
    });
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    });
  }

  public delete<Response>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
      data,
    });
  }

  private request<Response>(url: string, options: Options = {method: Method.Get}): Promise<Response> {
    const {method, data} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = (e) => {

        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({reason: 'abort'});
      xhr.onerror = () => reject({reason: 'network error'});
      xhr.ontimeout = () => reject({reason: 'timeout'});

      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}




// const METHODS = {
// 	GET: 'GET',
// 	PUT: 'PUT',
// 	POST: 'POST',
// 	DELETE: 'DELETE',
// };
//
// /**
//  * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
//  * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
//  * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
//  */
// function queryStringify(data: any) {
// 	console.log('queryStringify', data)
// 	let pairs = Object.keys(data).map((key) => {
// 		let value = data[key];
// 		if (Array.isArray(value)) {
// 			value = value.join(',')
// 		}
// 		return key + '=' + value;
// 	})
// 	let result = pairs.join('&');
// 	return '?' + result;
// }
//
// class HTTPTransport {
// 	get(url: string, options: any = {}) {
// 		return this.request(url, {...options, method: METHODS.GET}, options.timeout);
// 	}
//
// 	put(url: string, options: any = {}) {
// 		return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
// 	}
//
// 	delete(url: string, options: any = {}) {
// 		return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
// 	}
//
// 	post(url: string, options: any = {}) {
// 		return this.request(url, {...options, method: METHODS.POST}, options.timeout);
// 	}
//
//
// 	// PUT, POST, DELETE
//
// 	// options:
// 	// headers — obj
// 	// data — obj
// 	request(url: string, options: any, timeout = 5000) {
// 		return new Promise((resolve, reject)=> {
// 			let xhr = new XMLHttpRequest();
// 			let sendUrl = '';
// 			if (options.method === METHODS.GET && options.data ) {
// 				sendUrl = url + queryStringify(options.data)
// 			} else {
// 				sendUrl = url
// 			}
// 			xhr.open(options.method, sendUrl, true);
// 			xhr.timeout = timeout;
// 			console.log('headers', options.headers)
// 			Object.keys(options.headers || {}).forEach((elem)=> {
// 				xhr.setRequestHeader(elem, options.headers[elem]);
// 			})
// 			let body;
// 			if (options.method !== METHODS.GET) {
// 				body = JSON.stringify(options.data)
// 			}
//
// 			xhr.send(body);
// 			xhr.onload = function() {
// 				//if (xhr.status === 200) {
// 				resolve(xhr)
// 				//}
// 				//else {reject()}
// 			};
// 			xhr.ontimeout = function () {
// 				reject('timeout')
// 			}
// 			xhr.onerror = function () {
// 				reject('error')
// 			}
// 			xhr.onabort = function() {
// 				reject('abort');
// 			}
//
// 		});
//
// 	}
// }
