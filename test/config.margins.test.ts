import assert from "assert";
import Config, { Margin } from "../src/config";

describe("Margins", function () {
  describe("Default margins", function () {
    it("Should be zero", function () {
      const config = new Config();
      assert.equal(config.margin.top, 0);
      assert.equal(config.margin.right, 0);
      assert.equal(config.margin.bottom, 0);
      assert.equal(config.margin.left, 0);
    });
    it("getMargins() returns as expected", function () {
      const config = new Config();
      assert.equal(config.margin.toUnits().top, "0px");
      assert.equal(config.margin.toUnits().right, "0px");
      assert.equal(config.margin.toUnits().bottom, "0px");
      assert.equal(config.margin.toUnits().left, "0px");
    });
  });

  describe("Set margins", function () {
    it("Should set all four margins", function () {
      const config = new Config();
      const margin = new Margin(2);
      assert.equal(margin.top, 2);
      assert.equal(margin.right, 2);
      assert.equal(margin.bottom, 2);
      assert.equal(margin.left, 2);
    });
    it("Should set all four margins with fromString()", function () {
      const config = new Config();
      const margin = new Margin().fromString("2");
      assert.equal(margin.top, 2);
      assert.equal(margin.right, 2);
      assert.equal(margin.bottom, 2);
      assert.equal(margin.left, 2);
    });
    it("Should set specific margins", function () {
      const config = new Config();
      const margin = new Margin(2, 0, 10, 9);
      assert.equal(margin.top, 2);
      assert.equal(margin.right, 0);
      assert.equal(margin.bottom, 10);
      assert.equal(margin.left, 9);
    });
    it("Should set specific margins with fromString()", function () {
      const config = new Config();
      const margin = new Margin().fromString("2 0 10 9");
      assert.equal(margin.top, 2);
      assert.equal(margin.right, 0);
      assert.equal(margin.bottom, 10);
      assert.equal(margin.left, 9);
    });
  });
});
