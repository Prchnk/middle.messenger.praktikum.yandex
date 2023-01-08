import HTTPtransport from "./HTTPtransport";
import { expect } from "chai";

describe.only("HTTPtransport", () => {
  const HTTP = new HTTPtransport("/");
  it("basic", async () => {
    XMLHttpRequest.onCreate = (xhr) => {
      xhr.autoRespond = true
    }
    const req = await HTTP.get("/books")
    console.log("asasasasasa")
    expect(true).equal(true);

  });
});
