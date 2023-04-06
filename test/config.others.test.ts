import assert from "assert";
import Config from "../src/config";

describe("Others", function () {
  describe("source and isUrl", function () {
    it("Should be a URL", function () {
      const config = new Config({ source: "https://github.com/iamdual" });
      assert.equal(config.isUrl, true);
    });
    it("Should NOT be a URL", function () {
      const config = new Config({ source: "<b>Hello world!</b>" });
      assert.equal(config.isUrl, false);
    });
  });

  describe("timeout", function () {
    it("Should return in milliseconds", function () {
      const config = new Config({ timeout: 2 });
      assert.equal(config.timeout, 2_000);
    });
    it("Passing a string", function () {
      const config = new Config({ timeout: "2" });
      assert.equal(config.timeout, 2_000);
    });
  });

  describe("format", function () {
    it("Should accept lowercase", function () {
      const config = new Config({ format: "tabloid" });
      assert.equal(config.format, "TABLOID");
    });
    it("Should format be undefined", function () {
      const config = new Config({ width: 100, height: 200, format: "A2" });
      assert.equal(config.format, undefined);
      assert.equal(config.width, 100);
      assert.equal(config.height, 200);
    });
  });
});
