import HTTPtransport, { Method } from "./HTTPtransport";
import { expect } from "chai";
import { SinonFakeXMLHttpRequest } from "sinon";

type FakeResponse = {
  method: Method;
  url: string;
  body?: string;
  headers: Record<string, string>;
}

const API_URL = HTTPtransport.API_URL;

describe("HTTPtransport", () => {
  const HTTP = new HTTPtransport("");

  let fakeXhr: SinonFakeXMLHttpRequest = null;

  beforeEach(() => {
    fakeXhr = null;

    XMLHttpRequest.onCreate = (xhr) => {
      setTimeout(() => {
        fakeXhr = xhr;

        xhr.respond(
          200,
          { 'Content-type': 'application/json' },
          JSON.stringify({
            ok: true,
          }),
        );

      }, 1);
    }
  });


  it("get", async () => {
    await HTTP.get<FakeResponse>("/books");

    expect(fakeXhr.method).equal(Method.Get);
    expect(fakeXhr.url).equal(API_URL + '/books');
    expect(fakeXhr.requestBody).equal(undefined);
  });

  it("post", async () => {
    await HTTP.post<FakeResponse>("/books/1", { name: 'Red hat' });

    expect(fakeXhr.method).equal(Method.Post);
    expect(fakeXhr.url).equal(API_URL + '/books/1');
    expect(JSON.parse(fakeXhr.requestBody)).deep.equal({ "name": "Red hat" });
    expect(fakeXhr.requestHeaders['Content-Type']).equal('application/json;charset=utf-8');
  });

  it("post formData", async () => {
    const formData = new FormData();
    formData.append('param', 'test');

    await HTTP.post<FakeResponse>("/books/1", formData);

    expect(fakeXhr.method).equal(Method.Post);
    expect(fakeXhr.url).equal(API_URL + '/books/1');
    expect(fakeXhr.requestBody).deep.equal(formData);
    expect(fakeXhr.requestHeaders['Content-Type']).equal(undefined);
  });
});

describe("HTTPtransport error", () => {
  const HTTP = new HTTPtransport("");

  beforeEach(() => {
    XMLHttpRequest.onCreate = (xhr) => {
      setTimeout(() => {
        xhr.respond(
          500,
          { 'Content-type': 'application/json' },
          JSON.stringify({
            ok: false,
          }),
        );
      }, 1);
    }
  });


  it('fetch error', async () => {
    let error = null;

    try {
      await HTTP.get('/books');
      error = null;
    } catch (err) {
      error = err;
    } finally {
      expect(error, 'Request must be throw error').to.not.equal(null);
    }
  });
});
