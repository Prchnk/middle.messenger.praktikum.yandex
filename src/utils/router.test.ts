import router from "./router";
import { expect } from "chai";
import Block from "../block";

let Routes = { Index: "/", Register: "/register" };
class IndexPage extends Block {
  protected render(): DocumentFragment {
    return this.compile(() => "<div>IndexPage</div>", {})
  }
}

class RegisterPage extends Block {
  protected render(): DocumentFragment {
    return this.compile(() => "<div>RegisterPage</div>", {})
  }
}

class NotFoundPage extends Block {
  protected render(): DocumentFragment {
    return this.compile(() => "<div>NotFoundPage</div>", {})
  }
}

const getText = () => document.querySelector("#app")?.textContent;
const getPathName = () => window.location.pathname
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("router", () => {
  router.use(Routes.Index, IndexPage)
  router.use(Routes.Register, RegisterPage)
  router.useNotFound(NotFoundPage)
  it("basic", async () => {
    router.start();
    expect("IndexPage").equal(getText());
    expect(Routes.Index).equal(getPathName());

    router.go(Routes.Register);
    expect("RegisterPage").equal(getText());
    expect(Routes.Register).equal(getPathName());

    router.back();
    await sleep(100);
    expect("IndexPage").equal(getText());
    expect(Routes.Index).equal(getPathName());

    router.forward();
    await sleep(100);
    expect("RegisterPage").equal(getText());
    expect(Routes.Register).equal(getPathName());

  });
});
