import assert from "assert";
import Config, { Margin } from "../src/config";

describe("Margins", function () {
  describe("Defaults", function () {
    it("Should be zero", function () {
      const config = new Config();
      assert.equal(config.margin.top, 0);
      assert.equal(config.margin.right, 0);
      assert.equal(config.margin.bottom, 0);
      assert.equal(config.margin.left, 0);
    });
  });

  describe("Set margins", function () {
    it("Should set all four margins", function () {
      const margin = new Margin(2);
      assert.equal(margin.top, 2);
      assert.equal(margin.right, 2);
      assert.equal(margin.bottom, 2);
      assert.equal(margin.left, 2);
    });
    it("Should set all four margins with fromString()", function () {
      const margin = Margin.fromString("2px");
      assert.equal(margin.top, "2px");
      assert.equal(margin.right, "2px");
      assert.equal(margin.bottom, "2px");
      assert.equal(margin.left, "2px");
    });
    it("Should set specific margins", function () {
      const margin = new Margin(2, 0, 10, 9);
      assert.equal(margin.top, 2);
      assert.equal(margin.right, 0);
      assert.equal(margin.bottom, 10);
      assert.equal(margin.left, 9);
    });
    it("Should set specific margins with fromString()", function () {
      const margin = Margin.fromString("2 0 10 9");
      assert.equal(margin.top, "2");
      assert.equal(margin.right, "0");
      assert.equal(margin.bottom, "10");
      assert.equal(margin.left, "9");
    });
    it("Should set specific margins with fromString()", function () {
      const margin = Margin.fromString("0 100");
      assert.equal(margin.top, "0");
      assert.equal(margin.right, "100");
      assert.equal(margin.bottom, "0");
      assert.equal(margin.left, "100");
    });
    it("Should set with Config", function () {
      const config = new Config({ margin: new Margin(1, 2, 3, 4) });
      assert.equal(config.margin.top, 1);
      assert.equal(config.margin.right, 2);
      assert.equal(config.margin.bottom, 3);
      assert.equal(config.margin.left, 4);
    });
    it("Should set with an object", function () {
      const config = new Config({ margin: { top: 1, left: 2, right: 3 } });
      assert.equal(config.margin.top, 1);
      assert.equal(config.margin.left, 2);
      assert.equal(config.margin.right, 3);
      assert.equal(config.margin.bottom, 0);
    });
  });

  describe("isImplements()", function () {
    it("Valid object", function () {
      const obj = {
        top: 100,
        right: undefined,
        bottom: "100",
      };
      assert.equal(Margin.isImplements(obj), true);
    });
    it("Invalid object", function () {
      const obj = {
        top: {},
        right: false,
      };
      assert.equal(Margin.isImplements(obj), false);
    });
  });
});
