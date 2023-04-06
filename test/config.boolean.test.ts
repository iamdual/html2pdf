import assert from "assert";
import Config from "../src/config";

describe("Boolean parameters", function () {
  describe("javascript", function () {
    it("Passing a boolean", function () {
      const config = new Config({ javascript: true });
      assert.equal(config.javascript, true);
    });
    it("Passing a string", function () {
      const config = new Config({ javascript: "true" });
      assert.equal(config.javascript, true);
    });
  });

  describe("landscape", function () {
    it("Passing a boolean", function () {
      const config = new Config({ landscape: true });
      assert.equal(config.landscape, true);
    });
    it("Passing a string", function () {
      const config = new Config({ landscape: "true" });
      assert.equal(config.landscape, true);
    });
  });

  describe("base64", function () {
    it("Passing a boolean", function () {
      const config = new Config({ base64: true });
      assert.equal(config.base64, true);
    });
    it("Passing a string", function () {
      const config = new Config({ base64: "true" });
      assert.equal(config.base64, true);
    });
  });
});
