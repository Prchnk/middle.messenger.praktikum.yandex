import { expect } from "chai";
import { Button } from "./button"

describe("template", () => {
  it("basic", () => {
    let button = new Button({ type: "button", label: "кнопка", events: { click: () => { } }, classes: "btn" })
    let element = button.getContent() as HTMLButtonElement;
    console.log(element)
    expect("BUTTON").equal(element?.tagName);
    expect("button").equal(element?.type);
    expect("кнопка").equal(element?.textContent?.trim());
    expect(true).equal(element?.classList.contains("btn"));
  });
});
