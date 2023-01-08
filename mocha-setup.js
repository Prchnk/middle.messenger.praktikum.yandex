const {JSDOM} = require("jsdom")
const fs = require("fs")
const Handlebars = require("handlebars")
const sinon = require("sinon")

const {window} = new JSDOM(`<main>
  <div id="app"></div>
</main>`, {url: "http://localhost:3000"})

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.FormData = window.FormData;
global.Element = window.Element;
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

require.extensions[".hbs"] = function (module, filename) {
  const contents = fs.readFileSync(filename, "utf-8");
  module.exports.default = Handlebars.compile(contents);
};

require.extensions[".scss"] = function () {
  module.exports = () => ({});
};
